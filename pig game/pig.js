/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
/* IMPORTANT----------
Dice roll may take time to change as dice is a image with online link, so dice can take 2 3 sec to change.*/

//roundscore
var activePlayer, roundScore ,dice,score,active;
start();



document.querySelector('.btn-roll').addEventListener('click', function()
{
	console.log("roll btn working");
	if(active){
		
		var ifsix=dice;
		dice=Math.floor(Math.random()*6)+1;
		var dicetoggle=document.querySelector('.dice');
		dicetoggle.style.display='block';
		dicetoggle.src='dice-'+dice+'.png';
		
		//double six
		if(ifsix===6 && dice===6){
			score[activePlayer]=0;
			roundScore=0;
			document.getElementById('score-'+activePlayer).textContent=score[activePlayer]; 
			nextPlayer();}
		//not 1
		if(dice!==1){
		roundScore+=dice;

		document.querySelector('.current-'+activePlayer).textContent=roundScore;
		}
	
		else{
			nextPlayer();
			}

	}
});

document.querySelector('.btn-hold').addEventListener('click',function(){
	if(active){
	score[activePlayer]+=roundScore;
	console.log(score[activePlayer],activePlayer);
	document.getElementById('score-'+activePlayer).textContent=score[activePlayer];

	if(score[activePlayer]>=100){
		active=false;
		document.querySelector('.name-'+activePlayer).textContent='WINNER!';
		document.querySelector('.name-'+activePlayer).classList.remove('name');
		document.querySelector('.current-'+activePlayer).classList.remove('arrow');
		document.querySelector('.name-'+activePlayer).classList.add('winner');
		document.querySelector('.dice').style.display='none';


	}
	else{
	nextPlayer();
}
}
	console.log("hold-working");
});

document.querySelector('.btn-newgame').addEventListener('click',start);


function start(){
score=[0,0];
roundScore=0;
activePlayer=0;
active=true;
//reset to 0
document.querySelector('#score-0').textContent='0';
document.querySelector('.current-0').textContent='0';
document.querySelector('#score-1').textContent='0';
document.querySelector('.current-1').textContent='0';
document.querySelector('.dice').style.display='none';
document.querySelector('.name-0').textContent="player 1";
document.querySelector('.name-1').textContent="player 2";
//remove and add classes
document.querySelector('.player-0-area').classList.remove('active');
document.querySelector('.player-1-area').classList.remove('active');
document.querySelector('.player-0-area').classList.add('active');
document.querySelector('.name-0').classList.add('name');
document.querySelector('.name-1').classList.add('name');
document.querySelector('.current-0').classList.add('arrow');
document.querySelector('.current-1').classList.remove('arrow');
document.querySelector('.name-0').classList.remove('winner');
document.querySelector('.name-1').classList.remove('winner');
}

function nextPlayer(){
	activePlayer===0 ? activePlayer=1 : activePlayer=0;
	roundScore=0;
	document.querySelector('.current-0').textContent='0';
	document.querySelector('.current-1').textContent='0';
	document.querySelector('.player-0-area').classList.toggle('active');
	document.querySelector('.player-1-area').classList.toggle('active');
	document.querySelector('.current-0').classList.toggle('arrow');
	document.querySelector('.current-1').classList.toggle('arrow');
	console.log("else working");
}