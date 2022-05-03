import React from "react";
import { Image } from "react-native";
const message1 = require('../assets/keyDialogue1.png');
const message2 = require('../assets/keyDialogue2.png');
const message3 = require('../assets/keyDialogue3.png');
const message4 = require('../assets/keyDialogue4.png');
const gotKey = require('../assets/keyAcquired.png');
export default function Dialogue({ position, size, dialogueNumber, location, display }) {
    if (display) {
        if (dialogueNumber == 1) {
            return (
                <Image
                    style={{
                        width: size,
                        height: size * 0.4,
                        position: "absolute",
                        left: position[0],
                        top: location * (size * 0.6),
                    }}
                    resizeMode="stretch"
                    source={message1}
                />
            );
        }
        if (dialogueNumber == 2) {
            return (
                <Image
                    style={{
                        width: size,
                        height: size * 0.4,
                        position: "absolute",
                        left: position[0] * size,
                        top: location * (size * 0.6),
                    }}
                    resizeMode="stretch"
                    source={message2}
                />
            );
        }
        if (dialogueNumber == 3) {
            return (
                <Image
                    style={{
                        width: size,
                        height: size * 0.4,
                        position: "absolute",
                        left: position[0] * size,
                        top: location * (size * 0.6),
                    }}
                    resizeMode="stretch"
                    source={message3}
                />
            );
        }
        if (dialogueNumber == 4) {
            return (
                <Image
                    style={{
                        width: size,
                        height: size * 0.4,
                        position: "absolute",
                        left: position[0] * size,
                        top: location * (size * 0.6),
                    }}
                    resizeMode="stretch"
                    source={message4}
                />
            );
        }
        if (dialogueNumber == 5) {
            return (
                <Image
                    style={{
                        width: size,
                        height: size * 0.4,
                        position: "absolute",
                        left: position[0] * size,
                        top: location * (size * 0.6),
                    }}
                    resizeMode="stretch"
                    source={gotKey}
                />
            );
        }
    }
    else {
        return (
            <Image style={{
                width: 0,
                height: 0,
            }}
                source={message1}
            />
        )
    }
}
