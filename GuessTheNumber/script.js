"use strict";
//Math.trunc(Math.random()*20)+1
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let currentScore = 20;
let highestscore = 0;
let range = {};
function objectMatch(
  emoji = "?",
  desc = "Start guessing...",
  score = currentScore,
  won = false
) {
  if (won) {
    if (highestscore < score) {
      highestscore = score;
    }
  }
  return {
    emotion: emoji,
    description: desc,
    score: score,
    hS: highestscore,
    won: won,
  };
}

function reset(flag) {
  currentScore = 20;
  document.querySelector(".guess").value = "";
  if (flag == "won") {
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".highscore").textContent = range.hS;
  }
  else if (flag == "again") {
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    document.querySelector(".score").textContent = currentScore;
    document.querySelector(".emoji").textContent = "?";
    document.querySelector(".message").textContent = "Start guessing...";
    document.querySelector("body").style.backgroundColor = "#222";
  }
}
//document.querySelector(".message").textContent = "Correct number!";

document.querySelector(".check").addEventListener("click", () => {
  let guess = Number(document.querySelector(".guess").value);
  if(currentScore <= 0){
    range = objectMatch("☹️","You Lost",currentScore)
    document.querySelector(".emoji").textContent = range.emotion;
    document.querySelector(".message").textContent = range.description;
    document.querySelector(".score").textContent = range.score;
    return
  }
  if (!guess) {
    console.log("⛔️ No Number!");
    range = objectMatch();
  } else {
    let guessRange = Math.abs(secretNumber - guess);
    range =
      guessRange === 0
        ? objectMatch(
            "😀",
            "🎉 Congratulations! You guessed the correct number! 🎉",
            currentScore,
            true
          )
        : guessRange < 5
        ? objectMatch(
            "🔥",
            "You're very close! Your guess is very hot!",
            --currentScore
          )
        : guessRange < 10
        ? objectMatch("🌞", "You're close! Your guess is hot!", --currentScore)
        : guessRange < 20
        ? objectMatch("😶‍🌫️", "You're getting warmer!", --currentScore)
        : guessRange < 30
        ? objectMatch("🌨️", "You're cold!", --currentScore)
        : guessRange < 40
        ? objectMatch("🥶", "You're very cold", --currentScore)
        : objectMatch("☃️", "You're freezing!", --currentScore);
  }

  document.querySelector(".emoji").textContent = range.emotion;
  document.querySelector(".message").textContent = range.description;
  document.querySelector(".score").textContent = range.score;
  if (range.won) {
    reset("won");
  }

});

document.querySelector(".again").addEventListener("click", function () {
  reset("again");
});
