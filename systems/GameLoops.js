import Constants from "./Constants";
import Alert from "react-native";
export default function (entities, { events, dispatch }) {
  const head = entities.head;
  const key = entities.key;
  const door = entities.door;
  
  head.nextMove -= 1;
  if (events.length) {
    events.forEach((e) => {
      switch (e) {
        case "move-up":
          head.yPos = -1;
          head.xPos = 0;
          head.nextMove = 0;
          return;
        case "move-right":
          head.xPos = 1;
          head.yPos = 0;
          head.nextMove = 0;
          console.log(head.position[0]);
          return;
        case "move-down":
          head.yPos = 1;
          head.xPos = 0;
          head.nextMove = 0;
          return;
        case "move-left":   
          head.xPos = -1;
          head.yPos = 0;
          head.nextMove = 0;
          return;
      }
    });
  }

if (head.nextMove === 0) {


  if(
    head.position[0] + head.xPos < 0 ||
        head.position[0] + head.xPos >= Constants.GRID_SIZE ||
        head.position[1] + head.yPos < 0 ||
        head.position[1] + head.yPos >= Constants.GRID_SIZE ||
        (head.position[0] + head.xPos == door.position[0] &&
          head.position[1] + head.yPos == door.position[1] &&
          !head.keyGrabbed)
  ) {
      //head.position[0] -= head.xPos;
      //head.position[1] -= head.yPos;
      head.xPos = 0;
      head.yPos = 0;
  } else

  head.position[0] += head.xPos;
  head.position[1] += head.yPos;

  if (
          head.position[0] == key.position[0] &&
          head.position[1] == key.position[1]
        ) {

          key.position = [
            -100,-100
          ];
          head.keyGrabbed = true;
        }

  if (
    head.position[0] == door.position[0] && head.position[1] == door.position[1] && head.keyGrabbed
  ) {
    door.position = [
      -100,-100
    ];
    head.position = [
      -100,-100
    ];
    dispatch("game-over");
  }
}
  return entities;
}
