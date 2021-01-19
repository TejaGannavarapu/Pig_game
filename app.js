/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var dice,roundScore,globalScore,playerActive,gameStatus,winScore,prev,count;
document.querySelector(".final-score").addEventListener('keypress',function(){
    
    winScore = document.querySelector(".final-score").value;
    console.log(winScore);
    
});

init();

document.querySelector(".btn-roll").addEventListener('click',function(){
    if(gameStatus){
        //dice=6;
        dice = Math.floor(Math.random() * 6) + 1;
        //console.log(dice);
        var diceImg = document.getElementById("dice-1");
        diceImg.style.display = "block";
        diceImg.src = "dice-" + dice + ".png";
        if(globalScore[playerActive] + roundScore + dice >= winScore){
            console.log(winScore);
            gameStatus = 0;
            winner();
        }
        else{
            
            if(dice === 6 && dice === prev){
                count += 1;
                if(count == 2){
                    globalScore[playerActive] = 0;
                    document.getElementById("score-" + playerActive).textContent = 0;
                    nextPlayer();  
                }
                else{
                    roundScore += dice;
                    document.getElementById("current-" + playerActive).textContent = roundScore;
                }
                fading();
            }
            else if(dice != 1){
                roundScore += dice;
                document.getElementById("current-" + playerActive).textContent = roundScore;
                fading();
                prev = dice; 
            }
            else{
            //nextplayer
                fading();
                nextPlayer();
            }    
        }
        
    }

});

function fading(){
    window.setTimeout(()=>{
           document.querySelector("#dice-1").style.display = "none"; 
    },1000);
}

document.querySelector(".btn-hold").addEventListener('click',function(){

    globalScore[playerActive] += roundScore;
    document.getElementById("score-" + playerActive).textContent=globalScore[playerActive];
    if(globalScore[playerActive] >= winScore){
        winner();
    }
    else{
        //nextplayer
        nextPlayer();
    }

});

function nextPlayer(){

    playerActive === 0 ? playerActive = 1 : playerActive = 0;
    roundScore = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    count=0,prev = 0;

}

function winner(){
    
    document.getElementById("name-" + playerActive).textContent = "Winner!";
    //window.setTimeout(()=>{
    //   document.querySelector("#dice-1").style.display = "block";     
    //},500);
    document.querySelector("#dice-1").style.display = "none";
    document.getElementById("score-" + playerActive).textContent = globalScore[playerActive] + roundScore + dice;
    document.querySelector('.player-' + playerActive + '-panel').classList.add('winner');
    document.querySelector(".player-"+ playerActive +"-panel").classList.remove("active");
    gameStatus = 0;
    
}

document.querySelector(".btn-new").addEventListener('click',init);

function init(){

    playerActive = 0;
    roundScore = 0;
    globalScore = [0,0];
    gameStatus = 1;
    prev=0,count = 0;
    //winScore = window.prompt("enter the winScore");
    document.querySelector("#dice-1").style.display = "none";
    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").textContent = "Player 2";
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.add("active")
   
}

