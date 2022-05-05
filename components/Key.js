import React from "react";
import { Image } from "react-native";
const rightWKey = require('../assets/npcrightkey.png');
const leftWKey = require('../assets/npcleftkey.png');
const rightNOKey = require('../assets/npcrightkeyless.png');
const leftNOKey = require('../assets/npcleftkeyless.png');
export default function Key({ position, size, keyTaken, orientation }) {
  if (keyTaken == 0) {
    if (orientation == 1) {
      return (
        <Image
          style={{
            width: size,
            height: size,
            position: "absolute",
            left: position[0] * size,
            top: position[1] * size,
          }}
          resizeMode="stretch"
          source={rightWKey}
        />
      );
    }
    else if (orientation == 0) {
      return (
        <Image
          style={{
            width: size,
            height: size,
            position: "absolute",
            left: position[0] * size,
            top: position[1] * size,
          }}
          resizeMode="stretch"
          source={leftWKey}
        />
      );
    }
  }
  else {
    if (orientation == 1) {
      return (
        <Image
          style={{
            width: size,
            height: size,
            position: "absolute",
            left: position[0] * size,
            top: position[1] * size,
          }}
          resizeMode="stretch"
          source={rightNOKey}
        />
      );
    }
    else if (orientation == 0) {
      return (
        <Image
          style={{
            width: size,
            height: size,
            position: "absolute",
            left: position[0] * size,
            top: position[1] * size,
          }}
          resizeMode="stretch"
          source={leftNOKey}
        />
      );
    }
  }
}
