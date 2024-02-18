"use strict";


const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");

const diceEl = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const btnNewGame = document.querySelector(".btn--new");

const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);




let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  /*   ? (() => {
        document.querySelector(`.player--1`).classList.add(`player--active`);
        document.querySelector(`.player--0`).classList.remove(`player--active`);
        return 1;
    })()
    : (() => {
        document.querySelector(`.player--0`).classList.add(`player--active`);
        document.querySelector(`.player--1`).classList.remove(`player--active`);
        return 0;
    })(); */
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  currentScore = 0;
};

//RollDice functionality
const RolltheDice = () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `./images/dice-${dice}.png`;
    console.log("diceEl.src", diceEl.src, dice);
    if (dice !== 1) {
      //current player
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      console.log(
        "test=>",
        document.getElementById(`current--${activePlayer}`).textContent,
        `current--${activePlayer}`
      );
    } else {
      // switch the player
      switchPlayer();
    }
  }
};
btnRoll.addEventListener("click", RolltheDice);

console.log("score", score0El, score1El);

btnHold.addEventListener("click", () => {
  if (playing) {
    // adds score to global.

    // check the code if it is atleast 100.
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //finish the game
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener("click",init);
