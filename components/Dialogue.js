import React from "react";
import { Image } from "react-native";
const message1 = require('../assets/keyDialogue1.png');
const message2 = require('../assets/keyDialogue2.png');
const message3 = require('../assets/keyDialogue3.png');
const message4 = require('../assets/keyDialogue4.png');
const gotKey = require('../assets/keyAcquired.png');
const extraDialogue1 = require('../assets/extraDialogue1.png');
const extraDialogue2 = require('../assets/extraDialogue2.png');
const extraDialogue3 = require('../assets/extraDialogue3.png');
const unlockedDialogue1 = require('../assets/unlockedDialogue1.png')
const unlockedDialogue2 = require('../assets/unlockedDialogue2.png')
const unlockedDialogue3 = require('../assets/unlockedDialogue3.png')
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
        else if (dialogueNumber == 2) {
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
        else if (dialogueNumber == 3) {
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
        else if (dialogueNumber == 4) {
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
        else if (dialogueNumber == 5) {
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
        else if (dialogueNumber == 6) {
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
                    source={extraDialogue1}
                />
            );
        }
        else if (dialogueNumber == 7) {
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
                    source={extraDialogue2}
                />
            );
        }
        else if (dialogueNumber == 8) {
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
                    source={extraDialogue3}
                />
            );
        }
        else if (dialogueNumber == 9) {
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
                    source={unlockedDialogue1}
                />
            );
        }
        else if (dialogueNumber == 10) {
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
                    source={unlockedDialogue2}
                />
            );
        }
        else if (dialogueNumber == 11) {
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
                    source={unlockedDialogue3}
                />
            );
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
