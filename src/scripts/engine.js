
const state ={

    view:{
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score")
    },

    values: {
     
        velocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60
    },

    actions: {
        timeId: null,
        countDownTimerId: setInterval(countDown,1000)
    }
} ;


function countDown(){

    state.values.currentTime = state.values.currentTime - 1;
    state.view.timeLeft.textContent = state.values.currentTime;

   
    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timeId);
        alert("Game Over! O seu resultado foi: "+state.values.result);
    }
}

function playSound(audioAlternative){
    let audio = new Audio(`./src/audios/${audioAlternative}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){

    state.values.timeId = setInterval(randomSquare,state.values.velocity);
}

function addListenerHitBox(){
state.view.squares.forEach(
    (square) => { square.addEventListener("mousedown", () => {
        if(square.id === state.values.hitPosition){
            state.values.result = state.values.result +1
            state.view.score.textContent = state.values.result;
            state.values.hitPosition = null;
            playSound("hit");
        }
    });
});
}

function init(){
  
    moveEnemy();
    addListenerHitBox();
}

init();