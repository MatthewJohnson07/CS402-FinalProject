import { StatusBar } from 'expo-status-bar';
import React, {useRef, useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Button, SafeAreaView, VirtualizedList} from 'react-native';
import { GameEngine } from "react-native-game-engine";
import Constants from "./systems/Constants";
import Head from "./components/Head";
import Key from "./components/Key";
import Door from "./components/Door";
import GameLoops from "./systems/GameLoops";
import {Item} from './components/ListItem.js'
import {loadList,saveList} from './components/RemoteAccess.js'
import {Audio} from 'expo';
import PokemonLavenderTown from "./music/PokemonLavenderTown.mp3";
import Ionicons from 'react-native-vector-icons/Ionicons';

const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;

// declare our initial list of Items to show in the Virtual List.
var startlist = [
    {key: "RRR"}
];

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
    const [autosave,setsave] = useState(false);

    var screenChoice = ""

    const engine = useRef(null);
    const [isGameRunning, setIsGameRunning] = useState(true);
    const [viewmode, setVMode] = useState(false);
    const [viewLeaderboard, setLBoard] = useState(false);

    const randomPositions = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    async componentWillMount=> {
        this.backgroundMusic = new Audio.Sound();
        try {
            await this.backgroundMusic.loadAsync(
                require("/music/PokemonLavenderTown.mp3")
            );
            await this.backgroundMusic.setIsLoopingAsync(true);
            await this.backgroundMusic.playAsync();
            Audio.Sound.setCategory("Playback");
            // Music should be playing
        } catch (error) {
            // Error occurred
            console.log("music error")
        }
    }
    const [playing, setPlaying] = useState();
    const playPause = () => {
        if (this.backgroundMusic.isPlaying()) {
            this.backgroundMusic.pause();
            setPlaying(false);
        } else {
            setPlaying(true);
            this.backgroundMusic.play(success => {
                if (success) {
                    setPlaying(false);
                    console.log('successfully finished playing');
                } else {
                    setPlaying(false);
                    console.log('playback failed due to audio decoding errors');
                }
            });
        }
    };


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

    if(viewLeaderboard){
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
    if(viewmode)
    {
        screenChoice =   <SafeAreaView style={styles.canvas}>
            <GameEngine
                ref={engine}
                style={{
                    width: BoardSize,
                    height: BoardSize,
                    flex: null,
                    backgroundColor: "white",
                }}
                entities={{
                    head: {
                        position: [0,0],
                        size: Constants.CELL_SIZE,
                        nextMove: 1,
                        xPos: 0,
                        yPos: 0,
                        keyGrabbed: false,
                        renderer: <Head />
                    },
                    key: {
                        position: [
                            randomPositions(0, Constants.GRID_SIZE - 1),
                            randomPositions(0, Constants.GRID_SIZE - 1),
                        ],

                        size: Constants.CELL_SIZE,
                        renderer: <Key />,
                    },

                    door: {
                        position: [
                            Constants.GRID_SIZE -1, 0
                        ],
                        size: Constants.CELL_SIZE,
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
                <View style={styles.container}>
                    <TouchableOpacity style={styles.playBtn} onPress={playPause}>
                        <Ionicons name={'ios-play-outline'} size={36} color={'#FFFFFF'} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    }
    else {

        screenChoice =
            <SafeAreaView style={styles.canvas}>
                <View style={styles.backgroundImage}>
                    <Text style={styles.gameNameText}>
                        GENERIC TOP-DOWN RPG STYLE GAME
                    </Text>
                    <Text style={styles.mainAuthorTextWinkWinkItsJustAJokeYouKnow}>
                        BY ROSS RIPPEE
                    </Text>
                    <Text style={styles.friendshipIsMagic}>
                        and friends
                    </Text>
                    <View style={styles.startButton}>
                        <Button onPress={() => switchMode()}
                                title="Start Game"
                        />
                        <Button  onPress={() => goToLeaderboard()}
                                 title="Leaderboard" />
                    </View>
                </View>
                <View style={styles.controlContainer}>
                    <View style={styles.controllerRow}>
                        <TouchableOpacity>
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
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.playBtn} onPress={playPause}>
                            <Ionicons name={'ios-play-outline'} size={36} color={'#FFFFFF'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

    }

    return(screenChoice);





    function switchMode()
    {
        if (viewmode) // in grid mode
        {
            setVMode(false);
        }
        else // in Preview mode
        {
            setVMode(true);
        }
    }

    function goToLeaderboard()
    {
        if(viewLeaderboard)
        {
            setLBoard(false);
        } else
        {
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
        marginTop: 10,
        flex: 1,
    },
    controllerRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    controlBtn: {
        backgroundColor: "blue",
        width: 100,
        height: 100,
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
    },
    gameNameText: {
        marginTop: 10,
        fontFamily: 'Times New Roman',
        fontSize: '32px',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    mainAuthorTextWinkWinkItsJustAJokeYouKnow: {
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
    }

});