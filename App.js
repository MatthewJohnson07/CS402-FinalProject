import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Button, SafeAreaView, VirtualizedList, StatusBar } from 'react-native';
import { GameEngine } from "react-native-game-engine";
import Constants from "./systems/Constants";
import Head from "./components/Head";
import Key from "./components/Key";
import Door from "./components/Door";
import GameLoops from "./systems/GameLoops";
import DialoguePrompt from './components/DialoguePrompt';
import Dialogue from './components/Dialogue';
import { Item } from './components/ListItem.js'
import { loadList, saveList } from './components/RemoteAccess.js'
import { Stopwatch } from 'react-native-stopwatch-timer';
import { Audio } from 'expo-av';  // For music
import { getCurrentTimestamp } from 'react-native/Libraries/Utilities/createPerformanceLogger';
import PlaySound from './PlaySounds';

const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;

// declare our initial list of Items to show in the Virtual List.
var startlist = [
  { key: "RRR" }
];

var songShouldBePlaying = true;

var returnedFromGame = false;

var startTime;

var endTime;

var DATA = [
  {
    id: 1,
    name: 'RFR',
    completionTime: 60,
  },
  {
    id: 2,
    name: 'RFR',
    completionTime: 60,
  },
  {
    id: 3,
    name: 'RFR',
    completionTime: 60,
  },
  {
    id: 4,
    name: 'RFR',
    completionTime: 60,
  },
  {
    id: 5,
    name: 'RFR',
    completionTime: 60,
  },
  {
    id: 6,
    name: 'RFR',
    completionTime: 60,
  },
  {
    id: 7,
    name: 'RFR',
    completionTime: 60,
  },
  {
    id: 8,
    name: 'RFR',
    completionTime: 60,
  },
  {
    id: 9,
    name: 'RFR',
    completionTime: 60,
  },
  {
    id: 10,
    name: 'RFR',
    completionTime: 60,
  },
];



//export { loadedGame };

export default function App() {

  var emptydata = [];
  //necessary functions for the <VirtualList> Component

  /*
  const getItemCount = (data) => list.length; // return the total number of items in the actual list.  Ignore data
  */

  /*
  const getItem = (data, index) => list[index]; // get an individual item from the actual data list. Ignore data
  */

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
  const [viewmode, setVMode] = useState(1); // 1 = Main Menu, 2 = Game Mode, 3 = Leaderboard
  const [menuOptionOne, setMenuOption] = useState(true);

  const randomPositions = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // The following code will play music
  const [sound, setSound] = useState();
  async function playMenuSong() {

    const { sound } = await Audio.Sound.createAsync(
      require('./music/KH1DearlyBeloved.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }

  async function playGameSong() {

    const { sound } = await Audio.Sound.createAsync(
      require('./music/YUGIOHtDotREngland.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    if (songShouldBePlaying) {
      if (viewmode == 2) {
        sound.unloadAsync();
        playGameSong()
      }
      else {
        if (returnedFromGame) {
          sound.unloadAsync()
          returnedFromGame = false
        }
        playMenuSong();
      }
      songShouldBePlaying = false;
    }
  })

  // Hide status bar
  StatusBar.setHidden(true);

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
      <Text styles={styles.list}>{index}</Text>
    );
  };

  /*
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
  */

  const getItem = (data, index) => (
    {
      id: data[index].id,
      name: data[index].name,
      completionTime: data[index].completionTime
    }
  );

  const getItemCount = (data) => data.length;

  const Item = ({ id, name, completionTime }) => (
    <View style={styles.item}>
      <Text style={styles.title}>#{id}: {name} - {completionTime}</Text>
    </View>
  );

  var avirtlist = (
    <VirtualizedList
      data={DATA}
      initialNumToRender={10}
      renderItem={({ item }) => <Item name={item.name} completionTime={item.completionTime} id={item.id} />}
      keyExtractor={item => item.key}
      getItemCount={getItemCount}
      getItem={getItem}
    />
  );
  if (viewmode == 3) {
    screenChoice =
      <SafeAreaView style={styles.canvas}>
        <View style={styles.backgroundImage}>
          {avirtlist}
          <View style={styles.hint}>
            <Text style={styles.hintText}>
              Press the purple button to go back to the menu
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
            >
              <View style={styles.controlBtn} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.alterContainer}>
          <TouchableOpacity
            onPress={() => pressedA()}
          >
            <View style={styles.aBtn} />
          </TouchableOpacity>
        </View>

      </SafeAreaView >

  }
  else if (viewmode == 2) {

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
            opened: 0,
            renderer: <Door />,
          },
          dialogue: {
            position: [
              -10000,
              BoardSize / 2
            ],
            display: 0,
            size: BoardSize,
            dialogueNumber: 1,
            location: 0,
            renderer: <Dialogue />,
          },
        }}
        systems={[GameLoops]}
        running={isGameRunning}
        onEvent={(e) => {
          switch (e) {
            case "game-over":
              endTime = new Date().getTime()
              const timeElapsed = (endTime - startTime) / 1000
              if (timeElapsed < DATA[9].completionTime) {
                alert('Congratulations! You earned a high score!')
                var i = 0
                while (DATA[i].completionTime < timeElapsed) i++
                alert('You earned the #' + (i + 1) + ' score!')
                var j = 9
                while (j > i) {
                  DATA[j].name = DATA[j - 1].name
                  DATA[j].completionTime = DATA[j - 1].completionTime
                  j--
                }
                DATA[i].completionTime = timeElapsed
              }
              alert('Going back to the menu, please check the leaderboard!')
              setIsGameRunning(false);
              backToMenu();
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
  else if (viewmode == 1) {

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
                onPress={() => toggleMode()}
              >
                <View style={styles.controlBtn} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.alterContainer}>
            <TouchableOpacity
              onPress={() => pressedA()}
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
              <TouchableOpacity onPress={() => toggleMode()}>
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
              onPress={() => pressedA()}
            >
              <View style={styles.aBtn} />
            </TouchableOpacity>
          </View>

        </SafeAreaView >
    }



  }

  return (screenChoice);

  function toggleMode() {
    PlaySound('movedCursor')
    if (menuOptionOne) {
      setMenuOption(false)
    }
    else {
      setMenuOption(true)
    }
  }

  function pressedA() {
    if (!menuOptionOne) {
      PlaySound('pressedPurple')
      if (viewmode == 1) {
        setVMode(3)
      }
      else {
        setVMode(1)
      }
    }
    else {
      //loadedGame()
      PlaySound('loadedGame')
      startGame()
    }
  }

  function startGame() {
    setVMode(2);                   // setVMode(2);
    songShouldBePlaying = true;
    setIsStopwatchStart(true);
    setIsGameRunning(true);
    startTime = new Date().getTime()
  }

  function backToMenu() {
    setVMode(1);                  // setVMode(1);
    returnedFromGame = true;
    songShouldBePlaying = true;
    setIsStopwatchStart(false);
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
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  mainAuthorJoke: {
    fontStyle: 'italic',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  friendshipIsMagic: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  startButtonView: {
    position: 'absolute',
    top: (BoardSize * 1) / 2,
  },
  selectedText: {
    color: 'black',
    textAlign: 'center',
    backgroundColor: 'yellow',
    width: '100%',
  },
  leaderboardButtonView: {
    position: 'absolute',
    top: (BoardSize * 7) / 10,
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
    fontSize: 10,
  },
  leaderBoardView: {
    width: BoardSize,
    height: BoardSize
  },
  title: {
    color: 'purple',
    textAlign: 'center',
    fontSize: 22,
  },
});
