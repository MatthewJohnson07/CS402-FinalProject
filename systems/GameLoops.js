import Constants from "./Constants";
import Alert from "react-native";
export default function (entities, { events, dispatch }) {
  const head = entities.head;
  const key = entities.key;
  
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
        head.position[1] + head.yPos >= Constants.GRID_SIZE
  ) {
      head.position[0] -= head.xPos;
      head.position[1] -= head.yPos;
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
    head.position[0] == 24 && head.position[1] == 0 && head.keyGrabbed
  ) {
    dispatch("game-over");
  }
}
  return entities;
}
