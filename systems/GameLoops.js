import Constants from "./Constants";
import Alert from "react-native";
import SoundPlayer from 'react-native-sound-player'

export default function (entities, { events, dispatch }) {
  const head = entities.head;
  const key = entities.key;
  const door = entities.door;
  const dialoguePrompt = entities.dialoguePrompt;
  
  head.nextMove -= 1;
  if (events.length) {
    events.forEach((e) => {
      switch (e) {
        case "move-up":
          if (head.orientation == 3) {
            head.yPos = -1;
            head.xPos = 0;
            head.nextMove = 0;
          }
          else {
            head.orientation = 3;
          }
          return;
        case "move-right":
          if (head.orientation == 4) {
            head.xPos = 1;
            head.yPos = 0;
            head.nextMove = 0;
          }
          else {
            head.orientation = 4;
          }
          return;
        case "move-down":
          if (head.orientation == 1) {
            head.yPos = 1;
            head.xPos = 0;
            head.nextMove = 0;
          }
          else {
            head.orientation = 1;
          }
          return;
        case "move-left":
          if (head.orientation == 2) {
            head.xPos = -1;
            head.yPos = 0;
            head.nextMove = 0;
          }
          else {
            head.orientation = 2;
          }
          return;
        case "a":
          if (head.position[0] - 1 == key.position[0] && head.position[1] == key.position[1]) {
            key.keyTaken = 1
            key.orientation = 1
            head.keyGrabbed = true;
            dialoguePrompt.position[0] = -1;
            dialoguePrompt.position[1] = -1;
          }

          if (head.position[0] + 1 == key.position[0] && head.position[1] == key.position[1]) {
            key.keyTaken = 1
            key.orientation = 2
            head.keyGrabbed = true;
            dialoguePrompt.position[0] = -1;
            dialoguePrompt.position[1] = -1;
          }
          if (head.position[0] == door.position[0] - 1 && head.position[1] == door.position[1] + 1 && head.orientation == 3 && head.keyGrabbed) {
            door.locked = 0;
          }
          return;
      }
    });
  }

  if (head.nextMove === 0) {


    if (
      head.position[0] + head.xPos < 0 ||
      head.position[0] + head.xPos >= Constants.GRID_SIZE ||
      head.position[1] + head.yPos < 0 ||
      head.position[1] + head.yPos >= Constants.GRID_SIZE ||
      (head.position[0] + head.xPos == door.position[0] &&
        head.position[1] + head.yPos == door.position[1]) ||
      (head.position[0] + head.xPos == door.position[0] - 1 &&
        head.position[1] + head.yPos == door.position[1] &&
        door.locked == 1) ||
      (head.position[0] + head.xPos == door.position[0] - 2 &&
        head.position[1] + head.yPos == door.position[1]) ||
      (head.position[0] + head.xPos == key.position[0] &&
        head.position[1] + head.yPos == key.position[1] &&
        !head.keyGrabbed) || 
        (head.position[0] + head.xPos == key.position[0] && head.position[1] + head.yPos == key.position[1])
    ) {
      //head.position[0] -= head.xPos;
      //head.position[1] -= head.yPos;
      head.xPos = 0;
      head.yPos = 0;
    }

    head.position[0] += head.xPos;
    head.position[1] += head.yPos;

    dialoguePrompt.position[0] = -1;
    dialoguePrompt.position[1] = -1;
    if (head.position[1] == key.position[1]) {
      if (head.position[0] == key.position[0] - 1 || head.position[0] == key.position[0] + 1) {
        if (!head.keyGrabbed) {
          dialoguePrompt.position[0] = key.position[0];
          dialoguePrompt.position[1] = key.position[1] - 1;
        }
      }
    }

    if (
      head.position[0] == door.position[0] - 1 && head.position[1] == door.position[1] && head.keyGrabbed
    ) {
	  
      door.position = [
        -100, -100
      ];
      head.position = [
        -100, -100
      ];
      dispatch("game-over");
    }
  }
  return entities;
}
