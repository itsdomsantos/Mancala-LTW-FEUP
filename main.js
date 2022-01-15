import Tabuleiro from "./tabuleiro.js";

// Game
class Game{
  constructor(nSeeds, nCavs, mode, difficulty){
    this.tabuleiro = new Tabuleiro(nSeeds, nCavs, mode, difficulty);
    this.state = 'opened';
  }

  setState(){
    this.state = 'closed';
  }
}

let nrJogosEasy = 0;
let nrJogosMedium = 0;
let nrJogosHard = 0;
let nrVictoryEasy = 0;
let nrVictoryMedium = 0;
let nrVictoryHard = 0;


/* Gera as cavidades */
var slider_cav = document.getElementById("myRangeCav");
var output_cav = document.getElementById("output_cav")
output_cav.innerHTML = slider_cav.value; // Display the default slider value

/* Gera as sementes */
var slider_seed = document.getElementById("myRangeSeed");
var output_seed = document.getElementById("output_seed");
output_seed.innerHTML = slider_seed.value; // Display the default slider value



let currentMode;
if(document.getElementById("online").checked){
  currentMode = document.querySelectorAll('.mode')[1];
}
if(document.getElementById("computer").checked){
  currentMode = document.querySelectorAll('.mode')[0];
}

let currentDificulty = document.querySelectorAll('.dificuldade')[0];



let game = new Game(slider_seed.value, slider_cav.value, currentMode.id, currentDificulty.id); // INÍCIO DO JOGO


// modo do jogo
const modes = document.querySelectorAll('.mode');  // butoes de modo de jogo
modes.forEach(mode => {
  mode.addEventListener('click', choosenMode);
});

function choosenMode(evt) {
  currentMode = evt.target;
  
  if(document.getElementById("online").checked){
    document.getElementById("dificuldades").style.opacity = 0;
  }
  if(document.getElementById("computer").checked){
    document.getElementById("dificuldades").style.opacity = 1;
  }
}

// butoes de dificuldade
const dificuldades = document.querySelectorAll('.dificuldade');

dificuldades.forEach(dificuldade => {
  dificuldade.addEventListener('click', showDificulty);
});

function showDificulty(evt) {
  dificuldades.forEach(dificuldade => dificuldade.classList.remove('selected'));
  currentDificulty = evt.target;
  currentDificulty.classList.add('selected');
}



// função on change, atualiza as cavidades para as cavidades do slider
slider_cav.onchange = function() {
  output_cav.innerHTML = this.value;
  size = slider_cav.value;

  if(currentMode.id == 'computer') game.tabuleiro.clean_board();  
  if(currentMode.id != 'online') game = new Game(slider_seed.value, slider_cav.value, currentMode.id, currentDificulty.id);
}

// função on change, atualiza as sementes para as sementes do slider
slider_seed.onchange = function() {
  output_seed.innerHTML = this.value;
  initial = slider_seed.value;
  
  if(currentMode.id == 'computer') game.tabuleiro.clean_board();
  if(currentMode.id != 'online') game = new Game(slider_seed.value, slider_cav.value, currentMode.id, currentDificulty.id);
}



const modalButtons = document.querySelectorAll('.modal-show, .modal-close'); // Get all buttons used for showing and hiding the modals

/* Botões para abrir e fechar os modals */
modalButtons.forEach(button => { // atach a click event listener to each button and pass it a named callback function
  button.addEventListener('click', showOrHideModal);
});

function showOrHideModal(evt){
	const currentButtonElement = evt.target;
  if(currentButtonElement.dataset.modalId) { // if the button has the data attribute modalId, it's a 'show' button
  	const targetModalId = currentButtonElement.dataset.modalId // get the target modal id from the data attribute
  	const targetModalElement = document.getElementById(targetModalId); // get the target modal element

    if(currentButtonElement.dataset.modalId == 'new-game-modal' && currentDificulty.id == 'easy') nrJogosEasy ++;
    if(currentButtonElement.dataset.modalId == 'new-game-modal' && currentDificulty.id == 'medium') nrJogosMedium ++;
    if(currentButtonElement.dataset.modalId == 'new-game-modal' && currentDificulty.id == 'hard') nrJogosHard ++;

    if(currentButtonElement.dataset.modalId == 'classifications-modal') displayClassifications();

    if(currentButtonElement.dataset.modalId == 'new-game-modal' && currentMode.id == 'online' && nick == null) showMessage('Login first!', 1000);
    else if(currentButtonElement.dataset.modalId == 'new-game-modal' && currentMode.id == 'online' && nick != null) {
      targetModalElement.classList.remove('modal-hidden')
      joinGame();
    }
    else targetModalElement.classList.remove('modal-hidden'); // remove the CSS class used to hide it
  } 
  else { // the button is a 'close' button
    const parentModal = currentButtonElement.parentElement; // get the parent modal element
    if(currentButtonElement.id == 'surrender' && currentMode.id != 'online'){ // se for surrender dá uma msg e espera ate a msg desaparecer para fechar o jogo
      if(game.tabuleiro.jogada.victory == true && currentDificulty.id == 'easy') nrVictoryEasy ++;
      if(game.tabuleiro.jogada.victory == true && currentDificulty.id == 'medium') nrVictoryMedium ++;
      if(game.tabuleiro.jogada.victory == true && currentDificulty.id == 'hard')  nrVictoryHard ++;

      game.tabuleiro.jogada.setSurrender();
      game.tabuleiro.jogada.msgNoTabuleiro('Player Surrender. Computer Wins the Game!', 2500);

      document.getElementById('surrender').style.visibility = 'hidden';
      setTimeout(() =>{
        parentModal.classList.add('modal-hidden'); // add the CSS class used to hide it

        game.tabuleiro.clean_board();  
        game.setState();
        game = new Game(slider_seed.value, slider_cav.value, currentMode.id, currentDificulty.id);
      }, 2500);
    }
    else if(currentButtonElement.id == 'surrender' && currentMode.id == 'online'){
      leaveGame();
      setTimeout(() =>{
        parentModal.classList.add('modal-hidden');
      }, 2500);
    }
    else{
      if(currentButtonElement.id == 'quitGame'){
        if(game.tabuleiro.jogada.victory == true && currentDificulty.id == 'easy') nrVictoryEasy ++;
        if(game.tabuleiro.jogada.victory == true && currentDificulty.id == 'medium') nrVictoryMedium ++;
        if(game.tabuleiro.jogada.victory == true && currentDificulty.id == 'hard')  nrVictoryHard ++;
      }
  
      if(currentButtonElement.id == 'classificações'){
        document.querySelector('.classificações').remove();
        document.querySelector('.classificações').remove();
      }
      parentModal.classList.add('modal-hidden'); // add the CSS class used to hide it
  
      if(game.tabuleiro.jogada.gameOver == true && currentMode.id == 'computer') document.querySelector('.textOnBoard').remove(); // remove a frase do fecho do jogo
      if(game.state != 'closed') game.tabuleiro.clean_board();  
      game.setState();
      if(currentMode.id != 'online') game = new Game(slider_seed.value, slider_cav.value, currentMode.id, currentDificulty.id);
    }
  } 
}



/////* Classificações */////
function displayClassifications(){
  document.querySelector('.classificações').remove();
  const msg = document.createElement('div');
  const msg1 = document.createElement('div');
  const msg2 = document.createElement('div');
  msg.innerHTML = 'Difficulty:&nbsp;&nbsp;&nbsp;Easy&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + 'Games:&nbsp;&nbsp;&nbsp;' + nrJogosEasy + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Victories:&nbsp;&nbsp;&nbsp;' + nrVictoryEasy;
  msg1.innerHTML = 'Difficulty:&nbsp;&nbsp;&nbsp;Medium&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + 'Games:&nbsp;&nbsp;&nbsp;' + nrJogosMedium + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Victories:&nbsp;&nbsp;&nbsp;' + nrVictoryMedium;
  msg2.innerHTML = 'Difficulty:&nbsp;&nbsp;&nbsp;Hard&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + 'Games:&nbsp;&nbsp;&nbsp;' + nrJogosHard + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Victories:&nbsp;&nbsp;&nbsp;' + nrVictoryHard;
  msg.classList.add('classificações');
  msg1.classList.add('classificações');
  msg2.classList.add('classificações');
  document.getElementById('classifications-modal').append(msg);
  document.getElementById('classifications-modal').append(msg1);
  document.getElementById('classifications-modal').append(msg2);
}



// PARTE DO SERVIDOR
const URL = 'http://twserver.alunos.dcc.fc.up.pt:8008/'; // URL do servidor

const group = 97; 

let nick     = null; // Nick do jogador
let password = null; // Pass do jogador
let size     = slider_cav.value; // Número de cavidades (sem armazéns)
let initial  = slider_seed.value; // Número de sementes por cavidade
let gameId   = null; // Id do jogo
let sse = null;

const nickInput = document.getElementById('nickname');
nickInput.addEventListener('change', (evt) => nick = evt.target.value);

const passwordInput = document.getElementById('pass');
passwordInput.addEventListener('change', (evt) => password = evt.target.value);

const loginButton = document.getElementById('login');
loginButton.addEventListener('click', login);

// register
function login() {
  const credentials = {nick, password};
  fetch(URL + 'register', {
    'method': 'POST',
		'body': JSON.stringify(credentials)
  })
  .then(response => response.json())
  .then(jsonData => {
    if('error' in jsonData){
      showMessage('error on register', 1000);
    }
    else {
      gameId = jsonData.game;
      showMessage('Login Successful!', 1000)
    }
  })
  .catch(error => console.log(error));
}

// join
function joinGame() {
  const config = {group, nick, password, size, initial};
  fetch(URL + 'join', {
    'method': 'POST',
		'body': JSON.stringify(config)
  })
  .then(response => response.json())
  .then(jsonData => {
    if('error' in jsonData) {
      showMessage('error on join', 1000);
    } else {
      gameId = jsonData.game;
      console.log('New Game created. Game Id: ', gameId);
      game = new Game(slider_seed.value, slider_cav.value, currentMode.id, currentDificulty.id);
      startOnlineGame();
    }
  })
  .catch(error => console.log(error));
}

// start online game
function startOnlineGame() {
  if(sse != null) sse.close();

  sse = new EventSource(URL + 'update?nick=' + nick + '&game=' + gameId);
  sse.onmessage = receivedUpdate;
  game.tabuleiro.jogada.showMessage('Waiting for other player to play');
}

// 
function receivedUpdate(msg) {
  const message = JSON.parse(msg.data);
  console.log(message);
  if('board' in message) game.tabuleiro.jogada.remove_Text_On_Board('.message', 0);

  if('winner' in message && message.winner == nick) {
    showMessage('Other Player Surrender! You Won the Game!', 2500);
    leaveGame();
  }
  else if('winner' in message && message.winner == null) showMessage('Desistiu da espera. Nenhum vencedor!', 2500);
  else if('winner' in message && message.winner != nick) showMessage('You Surrender! You Lost!', 2500);
}

// leave
function leaveGame() {
  const config = {nick, password, game: gameId};
  fetch(URL + 'leave', {
    'method': 'POST',
		'body': JSON.stringify(config)
  })
  .then(response => response.json())
  .then(jsonData => {
    if('error' in jsonData) {
      showMessage('error on leave', 1000);
    } else {
      document.getElementById('surrender').style.visibility = 'hidden';
      setTimeout(() =>{
        game.tabuleiro.clean_board(); 
        game.setState(); 
      }, 2500);
    }
  })
  .catch(error => console.log(error));
}

// msg nos metodos fetch
function showMessage(message, time){
  const msg = document.createElement('span');
  msg.innerText = message;
  msg.classList.add('message');
  msg.style.marginBottom = 10 + '%';
  document.querySelector('body').append(msg);
  remove_Text_On_Board('.message', time);
}

function remove_Text_On_Board(msgToRemove, time){ // remove a msg que está no tabuleiro
  setTimeout(() => {document.querySelector(msgToRemove).remove()}, time); // Ao fim de 1000 ms a função remove o alerta de "Jogada Impossível";
}