/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/

// 1 = P1 places bombs, 2 = P2 places bombs, 3 = battle
let phase = 1;
let turn = 1;

// store bomb locations
let p1Bomb = [];
let p2Bomb = [];

// hearts
let p1Hearts = 3;
let p2Hearts = 3;

/*------------------------ Cached Element References ------------------------*/

const squares = document.querySelectorAll(".sqr");
const startBtn = document.querySelector(".strat");

const p1Heart1 = document.getElementById("p1-hearts-1");
const p1Heart2 = document.getElementById("p1-hearts-2");
const p1Heart3 = document.getElementById("p1-hearts-3");

const p2Heart1 = document.getElementById("p2-hearts-1");
const p2Heart2 = document.getElementById("p2-hearts-2");
const p2Heart3 = document.getElementById("p2-hearts-3");

/*----------------------------- Event Listeners -----------------------------*/

startBtn.addEventListener("click", startGame);

squares.forEach(sqr => {
    sqr.addEventListener("click", handleClick);
});

/*-------------------------------- Functions --------------------------------*/

