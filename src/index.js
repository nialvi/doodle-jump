import { initGame } from "./game";

document.addEventListener("DOMContentLoaded", () => {
  const config = {
    startPoint: 150,
    screen: document.querySelector(".screen"),
    buttonStart: document.querySelector(".start"),
    doodler: document.createElement("div"),
  };

  initGame(config);
});
