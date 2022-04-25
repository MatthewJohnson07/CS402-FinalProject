import { StatusBar } from 'expo-status-bar';
import React, {useRef, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Button} from 'react-native';
import { GameEngine } from "react-native-game-engine";
import Constants from "./systems/Constants";
import Head from "./components/Head";
import Key from "./components/Key";
import Door from "./components/Door";
import GameLoops from "./systems/GameLoops";
 

export default function App() {
  const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
  const engine = useRef(null);
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [viewmode, setVMode] = useState(false);

  const randomPositions = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  
var screenChoice = ""
 
 if(viewmode)
 {
  screenChoice =   <View style={styles.canvas}>
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
      </View>
    </View>
 }
 else {
  
screenChoice = 
<View style={styles.startButton}>
<Button onPress={() => switchMode()}
title="Start Game"
/>
</View>

  
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
   
});
