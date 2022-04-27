import React from "react";
import { Image } from "react-native";
const lockedDoor = require('../assets/lockedDoor.png');
const openedDoor = require('../assets/openedDoor.png');
export default function Door({ position, size, locked }) {
  if (locked == 1) {
    return (
      <Image
        style={{
          width: 3 * size,
          height: size,
          position: "absolute",
          left: position[0] * size - 2 * size,
          top: position[1] * size,
        }}
        resizeMode="stretch"
        source={lockedDoor}
      />
    );
  }
  else {
    return (
      <Image
        style={{
          width: 3 * size,
          height: size,
          position: "absolute",
          left: position[0] * size - 2 * size,
          top: position[1] * size,
        }}
        resizeMode="stretch"
        source={openedDoor}
      />
    );
  }
}
