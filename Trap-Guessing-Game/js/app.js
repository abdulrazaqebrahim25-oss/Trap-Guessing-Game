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

function startGame() {
    phase = 1;
    turn = 1;
    enableBoard(1);
    disableBoard(2);
} 

function handleClick(e) {
    const sqr = e.currentTarget;
    const player = parseInt(sqr.dataset.player);
    const index = parseInt(sqr.dataset.index);

    // phase 1 — player 1 places bombs
    if (phase === 1 && player === 1) {
        if (p1Bomb.includes(index)) return;

        p1Bomb.push(index);
        sqr.style.backgroundColor = "#f0df1c";

        if (p1Bomb.length === 3) {
            hideBombs(1);
            disableBoard(1);
            enableBoard(2);
            phase = 2;
        }
        return;
    }

    // phase 2 — player 2 places bombs
    if (phase === 2 && player === 2) {
        if (p2Bomb.includes(index)) return;

        p2Bomb.push(index);
        sqr.style.backgroundColor = "#f0df1c";

        if (p2Bomb.length === 3) {
            hideBombs(2);
            disableBoard(2);
            phase = 3;
            turn = 1;

            enableBoard(1);
            enableBoard(2);
        }
        return;
    }

    // phase 3 — battle
    if (phase === 3) {
        if (player === turn) return;
        attack(turn, player, index, sqr);
    }
}

function attack(attacker, defenderPlayer, index, sqr) {
    let hit = false;

    if (attacker === 1) {
        hit = p2Bomb.includes(index);
        if (hit) p1Hearts--;
        turn = 2;
    } else {
        hit = p1Bomb.includes(index);
        if (hit) p2Hearts--;
        turn = 1;
    }

    sqr.style.backgroundColor = hit ? "#ff4c4c" : "#6aff6a";

    updateHearts();
    checkWin();
} 

function hideBombs(player) {
    squares.forEach(sqr => {
        if (parseInt(sqr.dataset.player) === player) {
            sqr.style.backgroundColor = "";
        }
    });
}

function disableBoard(player) {
    squares.forEach(sqr => {
        if (parseInt(sqr.dataset.player) === player) {
            sqr.style.pointerEvents = "none";
        }
    });
}

function enableBoard(player) {
    squares.forEach(sqr => {
        if (parseInt(sqr.dataset.player) === player) {
            sqr.style.pointerEvents = "auto";
        }
    });
}

function updateHearts() {
    p1Heart1.style.visibility = p1Hearts >= 1 ? "visible" : "hidden";
    p1Heart2.style.visibility = p1Hearts >= 2 ? "visible" : "hidden";
    p1Heart3.style.visibility = p1Hearts >= 3 ? "visible" : "hidden";

    p2Heart1.style.visibility = p2Hearts >= 1 ? "visible" : "hidden";
    p2Heart2.style.visibility = p2Hearts >= 2 ? "visible" : "hidden";
    p2Heart3.style.visibility = p2Hearts >= 3 ? "visible" : "hidden";
}

function checkWin() {
    if (p1Hearts <= 0) {
        alert("Player 2 Wins!");
        endGame();
    }
    if (p2Hearts <= 0) {
        alert("Player 1 Wins!");
        endGame();
    }
}

function endGame() {
    squares.forEach(sqr => sqr.style.pointerEvents = "none");
}