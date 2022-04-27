import React from "react";
import { Image } from "react-native";
const lookingDown = require('../assets/forward.png');
const lookingLeft = require('../assets/left.png');
const lookingUp = require('../assets/backward.png');
const lookingRight = require('../assets/right.png');
export default function Head({ position, size, orientation }) {
  // Looking down
  if (orientation == 1) {
    return (
      <Image
        style={{
          width: size,
          height: size,
          backgroundColor: "white",
          position: "absolute",
          left: position[0] * size,
          top: position[1] * size,
        }}
        resizeMode="stretch"
        source={lookingDown}
      />
    );
  }
  // Looking left
  else if (orientation == 2) {
    return (
      <Image
        style={{
          width: size,
          height: size,
          backgroundColor: "white",
          position: "absolute",
          left: position[0] * size,
          top: position[1] * size,
        }}
        resizeMode="stretch"
        source={lookingLeft}
      />
    );
  }
  // Looking up
  else if (orientation == 3) {
    return (
      <Image
        style={{
          width: size,
          height: size,
          backgroundColor: "white",
          position: "absolute",
          left: position[0] * size,
          top: position[1] * size,
        }}
        resizeMode="stretch"
        source={lookingUp}
      />
    );
  }
  // Looking right
  else {
    return (
      <Image
        style={{
          width: size,
          height: size,
          backgroundColor: "white",
          position: "absolute",
          left: position[0] * size,
          top: position[1] * size,
        }}
        resizeMode="stretch"
        source={lookingRight}
      />
    );
  }
} 
