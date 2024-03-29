// challenge 1: Your Age in Days
function ageInDays(){
    var birthYear = prompt('what year were you born.. Good Friend?');
    var ageInDayss = (2019-birthYear)*365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are '+ageInDayss+' days old');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
    console.log(ageInDayss);
}

function reset(){
    document.getElementById('ageInDays').remove();
}


// Challenge 2: Cat Generator
function generateCat(){
    var image = document.createElement('img');
    var div = document.getElementById("flex-cat-gen");
    image.src = "https://thecatapi.com/meta-tag-image.png";
    div.appendChild(image);
}


// Challenge 3: Rock, Paper, Scissors
function rpsGame(yourChoice){
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randomRpsInt());
    console.log("Computer Choice: ",botChoice);
    results = decideWinner(humanChoice, botChoice); // [1,0] / [0,1] / [0.5, 0.5] / [human,bot]
    console.log('Result: ',results);
    message = finalMessage(results); // {'message': 'You won!', 'color': 'green'}
    console.log(message);
    rpsFrontEnd(yourChoice.id, botChoice, message);
    
}

function randomRpsInt(){
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number){
    return ['rock','paper','scissors'][number];
}

function decideWinner(yourChoice, computerChoice){
    var rpsDatabse = { // Databse to store the rpsRules
        'rock': {"scissors":1, 'rock':0.5, 'paper':0},
        'paper':{'rock':1, 'paper':0.5, 'scissors':0},
        'scissors':{'paper':1, 'scissors':0.5,'rock':0}
    };
    var yourScore = rpsDatabse[yourChoice][computerChoice];
    var computerScore = rpsDatabse[computerChoice][yourChoice];
    return  [yourScore,computerScore];
}

function finalMessage([yourScore,computerScore]){
    if (yourScore==0){
        return {'message':'You Lost!', 'color':'red'};
    }else if(yourScore==0.5){
        return {'message':'You Tied!', 'color':'yellow'};
    }else{
        return {'message':"You Won!", 'color':'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    
    var imagesDatabse = {
        'rock'    : document.getElementById('rock').src,
        'paper'   : document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    // let's remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('dic');
    var messageDiv = document.createElement('div');
    
    humanDiv.innerHTML = "<img src='" + imagesDatabse[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"                                                                                      
    messageDiv.innerHTML = "<h1 style='color:" + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>" 
    botDiv.innerHTML = "<img src='" + imagesDatabse[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"
    
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

}

// Challenge 4: Change the Color of All Buttons
var all_buttons = document.getElementsByTagName('button');

var copyAllButtons = [];
for (let i=0; i<all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1])
}

function buttonColorChange(buttonThingy){
    if (buttonThingy.value == 'red'){
        buttonsRed();
    }else if(buttonThingy.value == 'green'){
        buttonsGreen();
    }else if(buttonThingy.value == 'reset'){
        buttonsColorReset();
    }else if (buttonThingy.value == 'random'){
        randomColors();
    }
}

function buttonsRed(){
    for (let i=0; i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for (let i=0; i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonsColorReset(){
    for (let i=0; i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors(){
    for (let i=0; i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[radnomColorNumber()]);
    }
}

function radnomColorNumber(){
    let result = Math.floor( Math.random() * 100)%7;
    return result
}


// Challenge 5: Blackjack
let blackjackGame = {
    'you':{'scoreSpan':'#your-blackjack-result', 'div':'#your-box', 'score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result', 'div':'#dealer-box', 'score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10, 'Q':10, 'A':[1,11]},                                                   
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnOver':false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lostSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);


// For the HIT button
function blackjackHit(){
    if (blackjackGame['isStand']==false){
        let card = randomCard();
        console.log(card);
        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
        console.log(YOU['score']);

    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer){
    if (activePlayer['score']<=21){
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
    }
}

function blackjackDeal(){

    if (blackjackGame['turnOver'] == true){

    blackjackGame['isStand'] = false;

    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for (i=0; i<yourImages.length; i++){
        yourImages[i].remove();
    }
    for (i=0; i<dealerImages.length; i++){
        dealerImages[i].remove();
    }

    YOU['score']=0;
    DEALER['score']=0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;

    document.querySelector('#your-blackjack-result').style.color = '#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

    document.querySelector('#Blackjack-result').textContent = "Let's play";
    document.querySelector('#Blackjack-result').style.color = "black";

    blackjackGame['turnOver'] = true; // question!

    }
}

function updateScore(card, activePlayer){
    if (card == 'A'){
    // If adding 11 keeps me below 21, add 11. otherwise, add 1.
    if (activePlayer['score']+blackjackGame['cardsMap'][card][1]<=21){
        activePlayer['score'] += blackjackGame['cardsMap'][card][1];
    } else{
        activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }

    } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if (activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerLogic(){

    blackjackGame['isStand'] = true;

    while (DEALER['score']<16 && blackjackGame['isStand']==true){
        let card =randomCard();
        showCard(card, DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(700);
    }

    blackjackGame['turnOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}

// showResult(computeWinner());

// Compute winner and return who just won
// update the wins, drwas, and looses
function computeWinner(){
    let winner;

    if (YOU['score']<=21){
        // condition: higher score than dealer or when dealer busts but you're 21 or under
        if (YOU['score']>DEALER['score'] || (DEALER['score']>21)){
            blackjackGame['wins']++;
            winner = YOU;
        }else if(YOU['score']<DEALER['score']){
            blackjackGame['losses']++;
            winner = DEALER;
        }else if(YOU['score']==DEALER['score']){
            blackjackGame['draws']++;
        }

        // condition: when user busts but dealer doesn't
    }else if(YOU['score']>21 && DEALER['score']<=21){
        blackjackGame['losses']++;
        winner = DEALER;

        // conidtion: when you AND the dealer busts
    }else if(YOU['score']>21 && DEALER['score']>21){
        blackjackGame['draws']++;
    }

    console.log(blackjackGame);
    return winner;
}

function showResult(winner){
    let message, messageColor;

    if (blackjackGame['turnOver'] == true){

        if (winner == YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winSound.play();
        }else if(winner==DEALER){
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You Lost';
            messageColor = 'red';
            lostSound.play();
        }else{
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You Draw';
            messageColor = 'black';
        }

        document.querySelector('#Blackjack-result').textContent = message;
        document.querySelector('#Blackjack-result').style.color = messageColor;
    }
}


