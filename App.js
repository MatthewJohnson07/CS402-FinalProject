import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Button, SafeAreaView, VirtualizedList } from 'react-native';
import { GameEngine } from "react-native-game-engine";
import Constants from "./systems/Constants";
import Head from "./components/Head";
import Key from "./components/Key";
import Door from "./components/Door";
import GameLoops from "./systems/GameLoops";
import DialoguePrompt from './components/DialoguePrompt';
import { Item } from './components/ListItem.js'
import { loadList, saveList } from './components/RemoteAccess.js'
import { Stopwatch } from 'react-native-stopwatch-timer';
import { Audio } from 'expo-av';  // For music

const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;

// declare our initial list of Items to show in the Virtual List.
var startlist = [
  { key: "RRR" }
];

var songShouldBePlaying = true;

export default function App() {

  var emptydata = [];
  //necessary functions for the <VirtualList> Component
  const getItemCount = (data) => list.length; // return the total number of items in the actual list.  Ignore data
  const getItem = (data, index) => list[index]; // get an individual item from the actual data list. Ignore data

  // here we can use fetch to load an initial data set from a remote url
  // var urladdress = "http://mec402.boisestate.edu/cgi-bin/cs402/onejson"
  //var urladdress = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/onejson"
  //const response = loadList(urladdress,startlist)
  const [list, setlist] = useState(startlist);
  const [secondlist, setsecondlist] = useState(startlist);
  const [autosave, setsave] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  var screenChoice = ""

  const engine = useRef(null);
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [viewmode, setVMode] = useState(false);
  const [viewLeaderboard, setLBoard] = useState(false);
  const [menuOptionOne, setMenuOption] = useState(true);

  const randomPositions = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // The following code will play Dearly Beloved
  const [sound, setSound] = useState();
  async function playSound() {

    const { sound } = await Audio.Sound.createAsync(
      require('./music/KH1DearlyBeloved.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    if (songShouldBePlaying) {
      playSound();
      songShouldBePlaying = false;
    }
    if (viewLeaderboard || viewmode) {
      sound.unloadAsync();
      //Audio.setIsEnabledAsync(false);
    }
  })

  // the following functions modify the data in the list.
  // read data from remote URL
  function loadButton() {
    var urladdress =
      'https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=lkarlsson';
    const response = loadList(urladdress, list, setlist);
  }

  // this function is called to draw a single item inside of the virtual list
  const renderItem = ({ item, index }) => {
    return (
      <Item
        item={item}
        backgroundColor={"black"}
        textColor={"white"}
      />
    );
  };

  var avirtlist = (
    <VirtualizedList
      styles={styles.list}
      data={emptydata}
      initialNumToRender={4}
      renderItem={renderItem}
      keyExtractor={(item, index) => index}
      getItemCount={getItemCount}
      getItem={getItem}
    />
  );

  if (viewLeaderboard) {
    screenChoice =
      <SafeAreaView>

        <View style={styles.startButton}>
          <Button onPress={() => goToLeaderboard()}
            title="Go Back"
          />
          {avirtlist}
        </View>
      </SafeAreaView>

  }
  else
    if (viewmode) {

      screenChoice = <SafeAreaView style={styles.canvas}>
        <GameEngine
          ref={engine}
          style={{
            width: BoardSize,
            height: BoardSize,
            flex: null,
            backgroundColor: "green",
          }}
          entities={{
            head: {
              position: [0, 0],
              size: Constants.CELL_SIZE,
              nextMove: 1,
              xPos: 0,
              yPos: 0,
              keyGrabbed: false,
              renderer: <Head />
            },
            key: {
              position: [
                randomPositions(0, Constants.GRID_SIZE - 4),
                randomPositions(1, Constants.GRID_SIZE - 1),
              ],

              size: Constants.CELL_SIZE,
              keyTaken: 0,
              orientation: 1,
              renderer: <Key />,
            },

            dialoguePrompt: {
              position: [
                -1,
                -1,
              ],
              size: Constants.CELL_SIZE,
              renderer: <DialoguePrompt />,
            },

            door: {
              position: [
                Constants.GRID_SIZE - 1, 0
              ],
              size: Constants.CELL_SIZE,
              locked: 1,
              renderer: <Door />,
            }
          }}
          systems={[GameLoops]}
          running={isGameRunning}
          onEvent={(e) => {
            switch (e) {
              case "game-over":
                alert("Game over!");
                setIsGameRunning(false);
                setVMode(false);
                songShouldBePlaying = true;
                return;
            }
          }}
        />
        <View style={styles.controlContainer}>
          <View style={styles.controllerRow}>
            <TouchableOpacity onPress={() => engine.current.dispatch("move-up")}>
              <View style={styles.controlBtn} />
            </TouchableOpacity>
          </View>
          <View style={styles.controllerRow}>
            <TouchableOpacity
              onPress={() => engine.current.dispatch("move-left")}
            >
              <View style={styles.controlBtn} />
            </TouchableOpacity>
            <View style={[styles.controlBtn, { backgroundColor: null }]} />
            <TouchableOpacity
              onPress={() => engine.current.dispatch("move-right")}
            >
              <View style={styles.controlBtn} />
            </TouchableOpacity>
          </View>
          <View style={styles.controllerRow}>
            <TouchableOpacity
              onPress={() => engine.current.dispatch("move-down")}
            >
              <View style={styles.controlBtn} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.alterContainer}>
          <TouchableOpacity
            onPress={() => engine.current.dispatch("a")}
          >
            <View style={styles.aBtn} />
          </TouchableOpacity>
        </View>
        <Stopwatch
          laps
          msecs
          start={isStopwatchStart}
          //To start
          reset={resetStopwatch}
          //To reset
          getTime={(time) => {

          }}
        />

      </SafeAreaView>
    }
    else {

      if (menuOptionOne) {
        screenChoice =
          <SafeAreaView style={styles.canvas}>
            <View style={styles.backgroundImage}>
              <Text style={styles.gameNameText}>
                GENERIC TOP-DOWN RPG STYLE GAME
              </Text>
              <Text style={styles.mainAuthorJoke}>
                BY ROSS RIPPEE
              </Text>
              <Text style={styles.friendshipIsMagic}>
                and Matthew, Lukas and Javi
              </Text>
              <View style={styles.startButtonView}>
                <Text style={styles.selectedText}>
                  START GAME
                </Text>
              </View>
              <View style={styles.leaderboardButtonView}>
                <Text style={styles.nonselectedText}>
                  LEADERBOARD
                </Text>
              </View>
              <View style={styles.hint}>
                <Text style={styles.hintText}>
                  Press the purple button to start the game
                </Text>
              </View>
            </View>
            <View style={styles.controlContainer}>
              <View style={styles.controllerRow}>
                <TouchableOpacity
                  
                >
                  <View style={styles.controlBtn} />
                </TouchableOpacity>
              </View>
              <View style={styles.controllerRow}>
                <TouchableOpacity

                >
                  <View style={styles.controlBtn} />
                </TouchableOpacity>
                <View style={[styles.controlBtn, { backgroundColor: null }]} />
                <TouchableOpacity

                >
                  <View style={styles.controlBtn} />
                </TouchableOpacity>
              </View>
              <View style={styles.controllerRow}>
                <TouchableOpacity
                  onPress={() => setMenuOption(false)}
                >
                  <View style={styles.controlBtn} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.alterContainer}>
              <TouchableOpacity
                onPress={() => switchMode()}
              >
                <View style={styles.aBtn} />
              </TouchableOpacity>
            </View>

          </SafeAreaView >
      }
      else {
        screenChoice =
          <SafeAreaView style={styles.canvas}>
            <View style={styles.backgroundImage}>
              <Text style={styles.gameNameText}>
                GENERIC TOP-DOWN RPG STYLE GAME
              </Text>
              <Text style={styles.mainAuthorJoke}>
                BY ROSS RIPPEE
              </Text>
              <Text style={styles.friendshipIsMagic}>
                and Matthew, Lukas and Javi
              </Text>
              <View style={styles.startButtonView}>
                <Text style={styles.nonselectedText}>
                  START GAME
                </Text>
              </View>
              <View style={styles.leaderboardButtonView}>
                <Text style={styles.selectedText}>
                  LEADERBOARD
                </Text>
              </View>
              <View style={styles.hint}>
                <Text style={styles.hintText}>
                  Press the purple button to view the top scores
                </Text>
              </View>
            </View>
            <View style={styles.controlContainer}>
              <View style={styles.controllerRow}>
                <TouchableOpacity onPress={() => setMenuOption(true)}>
                  <View style={styles.controlBtn} />
                </TouchableOpacity>
              </View>
              <View style={styles.controllerRow}>
                <TouchableOpacity

                >
                  <View style={styles.controlBtn} />
                </TouchableOpacity>
                <View style={[styles.controlBtn, { backgroundColor: null }]} />
                <TouchableOpacity

                >
                  <View style={styles.controlBtn} />
                </TouchableOpacity>
              </View>
              <View style={styles.controllerRow}>
                <TouchableOpacity

                >
                  <View style={styles.controlBtn} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.alterContainer}>
              <TouchableOpacity
                onPress={() => goToLeaderboard()}
              >
                <View style={styles.aBtn} />
              </TouchableOpacity>
            </View>

          </SafeAreaView >
      }



    }

  return (screenChoice);





  function switchMode() {
    if (viewmode) // in grid mode
    {
      setVMode(false);
      songShouldBePlaying = true;
      setIsStopwatchStart(false);
      setResetStopwatch(true);
    }
    else // in Preview mode
    {
      setVMode(true);
      setIsStopwatchStart(true);
      setIsGameRunning(true);
    }
  }

  function goToLeaderboard() {
    if (viewLeaderboard) {
      setLBoard(false);
    } else {
      setLBoard(true);
    }
  }
}






const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlContainer: {
    marginTop: 20,
    marginLeft: -170,
    flex: 0.8,
  },
  alterContainer: {
    marginTop: 10,
    marginLeft: 290,
    flex: 6.6,
  },
  controllerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  controlBtn: {
    backgroundColor: "blue",
    width: 90,
    height: 90,
  },
  aBtn: {
    backgroundColor: "darkmagenta",
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  startButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreScreenContainer: {
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'center',
  },
  backgroundImage: {
    width: BoardSize,
    height: BoardSize,
    backgroundColor: 'black',
    flexDirection: 'column',
    alignItems: 'center',
  },
  gameNameText: {
    marginTop: 10,
    fontFamily: 'Times New Roman',
    fontSize: '32px',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  mainAuthorJoke: {
    fontFamily: 'Georgia',
    fontWeight: 'italics',
    fontSize: '24px',
    color: 'white',
    textAlign: 'center',
  },
  friendshipIsMagic: {
    fontFamily: 'Lucida Handwriting',
    fontSize: '16px',
    color: 'white',
    textAlign: 'center',
  },
  startButtonView: {
    position: 'absolute',
    top: (BoardSize * 2) / 5,
  },
  selectedText: {
    color: 'black',
    textAlign: 'center',
    backgroundColor: 'yellow',
    width: '100%',
  },
  leaderboardButtonView: {
    position: 'absolute',
    top: (BoardSize * 3) / 5,
  },
  nonselectedText: {
    color: 'white',
    textAlign: 'center',
  },
  hint: {
    width: '100%',
    position: 'absolute',
    top: (BoardSize * 4) / 5,
    backgroundColor: 'blue',
  },
  hintText: {
    color: 'white',
    textAlign: 'center',
    fontSize: '10px',
  },
});
