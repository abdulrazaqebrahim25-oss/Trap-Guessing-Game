/*-------------------------------- Variables --------------------------------*/

// 1 = P1 places bombs, 2 = P2 places bombs, 3 = battle
let phase = 0;
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

const phaseText = document.getElementById("phase");

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

    p1Bomb = [];
    p2Bomb = [];

    p1Hearts = 3;
    p2Hearts = 3;

    updateHearts();

    phaseText.textContent = "Phase 1: Player 1, choose 3 bombs";

    enableBoard(1);
    disableBoard(2);

    squares.forEach(s => s.style.backgroundColor = "");
}


function handleClick(e) {
    const sqr = e.currentTarget;
    const player = parseInt(sqr.dataset.player);
    const index = parseInt(sqr.dataset.index);

    /* ---------------- PHASE 1: Player 1 chooses bombs ---------------- */
    if (phase === 1 && player === 1) {
        if (p1Bomb.includes(index)) return;

        p1Bomb.push(index);
        sqr.style.backgroundColor = "#f0df1c";

        if (p1Bomb.length === 3) {
            hideBombs(1);
            disableBoard(1);
            enableBoard(2);

            phase = 2;
            phaseText.textContent = "Phase 2: Player 2, choose 3 bombs";
        }
        return;
    }

    /* ---------------- PHASE 2: Player 2 chooses bombs ---------------- */
    if (phase === 2 && player === 2) {
        if (p2Bomb.includes(index)) return;

        p2Bomb.push(index);
        sqr.style.backgroundColor = "#f0df1c";

        if (p2Bomb.length === 3) {
            hideBombs(2);
            disableBoard(2);

            phase = 3;
            turn = 1;

            phaseText.textContent = "Battle Phase: Player 1 Attack!";
            enableBoard(1);
            enableBoard(2);
        }
        return;
    }

    /* ---------------- PHASE 3: Battle ---------------- */
    if (phase === 3) {

        // cannot attack your own board
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
        phaseText.textContent = "Player 2 Attack!";
    } else {
        hit = p1Bomb.includes(index);
        if (hit) p2Hearts--;

        turn = 1;
        phaseText.textContent = "Player 1 Attack!";
    }

    sqr.style.backgroundColor = hit ? "#ff4c4c" : "#6aff6a";

    if (hit) {
    sqr.classList.add("hit-bomb");

    setTimeout(() => {
        sqr.classList.remove("hit-bomb");
    }, 400);
}
   

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
        phaseText.textContent = "🔥 Player 2 Wins!";
        endGame();
    }

    if (p2Hearts <= 0) {
        phaseText.textContent = "🔥 Player 1 Wins!";
        endGame();
    }

    
}


function endGame() {
    squares.forEach(sqr => sqr.style.pointerEvents = "none");

    startBtn.textContent = "Reset";  
    startBtn.style.backgroundColor = "#0bed74ff"; 
    startBtn.onclick = resetGame;
}


function resetGame() {

    phase = 1;
    turn = 1;

    
    p1Bomb = [];
    p2Bomb = [];


    p1Hearts = 3;
    p2Hearts = 3;

    updateHearts(); 

    
    squares.forEach(sqr => {
        sqr.style.backgroundColor = "";
        sqr.style.pointerEvents = "auto";
        
        
    });

    
    startBtn.textContent = "Start";
    startBtn.style.backgroundColor = "#f4be2b";
    startBtn.onclick = startGame;


    startGame();
}


