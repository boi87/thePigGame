/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores,
  roundScore,
  activePlayer,
  dice,
  prevDice,
  gamePlaying,
  inputMaxScore,
  maxScore;

// customized max-score

// const getMaxScore = () => {
// if (gamePlaying)
document.querySelector(".btn-winning-score").addEventListener("click", () => {
  inputMaxScore = document.getElementById("input-winning-score").value;
  console.log(inputMaxScore);
  if (!inputMaxScore) {
    maxScore = 100;
    console.log("no custom max score entered");
  } else {
    maxScore = inputMaxScore;
    console.log("your new maxscore is", inputMaxScore);
  }
});
// };

// *** Initialize New Game ***
const init = () => {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0"; // overrides what's written in the HTML
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");
};

init();

// ***randomly roll dice and determine what a number one does***
document.querySelector(".btn-roll").addEventListener("click", () => {
  if (gamePlaying) {
    // 1. Random number
    let dice = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "media/dice-" + dice + ".png";

    //3. Update the round score IF the rolled number was NOT a 1

    if (dice !== 1) {
      //add score
      roundScore += dice; // or, roundScore = roundScore+ dice
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //next player
      console.log(activePlayer, "GOT A ONE HERE!");
      let diceDOM = document.querySelector(".dice");
      diceDOM.style.display = "block";
      diceDOM.src = "media/dice-red-1.png";

      setTimeout(() => {
        nextPlayer();
      }, 300);
    }

    // ***DOUBLESIX - if player gets two sixes in a row, roundscore to zero and nextplayer()***
    if (dice === 6 && prevDice === 6) {
      console.log(activePlayer, "DOUBLE SIX");
      let diceDOM = document.querySelector(".dice");
      diceDOM.style.display = "block";
      diceDOM.src = "media/dice-double-6.png";

      setTimeout(() => {
        nextPlayer();
      }, 300);
    } else if (dice === 6 && prevDice != 6) {
      prevDice = 6;
      console.log(activePlayer, prevDice);
    } else {
      prevDice = dice;
      console.log(activePlayer, prevDice);
    }
  }
});

//***hold button will store score in global score***
document.querySelector(".btn-hold").addEventListener("click", () => {
  // ***if active player pressed hold after a six, this won't impact the next player***
  prevDice === 6 ? (prevDice = 0) : prevDice;

  if (gamePlaying) {
    // getMaxScore();
    // add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // check if player won the game
    if (scores[activePlayer] >= maxScore) {
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
      document.querySelector(".dice").style.dysplay = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});

//***Switch to next player***
const nextPlayer = () => {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //***add and remove the class .active***
  // document.querySelector(".player-0-panel").classList.remove("active");
  // document.querySelector(".player-1-panel").classList.add("active");

  //can be improved using 'toggle'
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // hide the dice when the players switch
  document.querySelector(".dice").style.display = "none";
};

document.querySelector(".btn-new").addEventListener("click", init);
