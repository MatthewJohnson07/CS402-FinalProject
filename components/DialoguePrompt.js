import React from "react";
import { Image } from "react-native";
const sprite = require('../assets/dialoguePrompt.png');
export default function DialoguePrompt({ position, size }) {
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
                source={sprite}
            />
        );
}
