/*
    THIS FILE IS NO LONGER IN USE
*/
import React from "react";
import { View } from "react-native";
export default function Door({ position, size }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: "black",
        position: "absolute",
        left: position[0] * size,
        top: position[1] * size,
      }}
    ></View>
  );
}