export function renderDoodler({ screen, doodler, leftSpace, bottomSpace }) {
  screen.appendChild(doodler);
  doodler.classList.add("doodler");
  doodler.style.left = `${leftSpace}px`;
  doodler.style.bottom = `${bottomSpace}px`;
}

export function jump(state) {
  state.doodler.isJumping = true;
  state.timers.up = setInterval(() => {
    state.doodler.bottomSpace += 5;
    state.doodler.element.style.bottom = `${state.doodler.bottomSpace}px`;

    if (state.doodler.bottomSpace > state.screen.startPoint + 200) {
      fall(state);
    }
  }, state.frameMs);
}

export function gameOver(screen, score) {
  screen.innerHTML = score;
}

function fall(state) {
  state.doodler.isJumping = false;
  clearInterval(state.timers.up);
  state.timers.fallDown = setInterval(() => {
    state.doodler.bottomSpace -= 5;
    state.doodler.element.style.bottom = `${state.doodler.bottomSpace}px`;

    if (state.doodler.bottomSpace <= 0) {
      clearInterval(state.timers.fallDown);
      gameOver(state.screen.element, state.score);
    }

    state.platforms.forEach((platform) => {
      if (
        state.doodler.bottomSpace >= platform.bottom &&
        state.doodler.bottomSpace <= platform.bottom + 15 &&
        state.doodler.leftSpace + 87 >= platform.left &&
        state.doodler.leftSpace <= platform.left + 85 &&
        !state.isJumping
      ) {
        clearInterval(state.timers.fallDown);
        state.screen.startPoint = state.doodler.bottomSpace;
        state.score += 1;
        jump(state);
      }
    });
  }, state.frameMs);
}
