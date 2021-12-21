import Tabuleiro from "./tabuleiro.js";

// Game
class Game{
  constructor(nSeeds, nCavs){
    this.tabuleiro = new Tabuleiro(nSeeds, nCavs);
  }
}


/* Gera as cavidades */
var slider_cav = document.getElementById("myRangeCav");
var output_cav = document.getElementById("output_cav")
output_cav.innerHTML = slider_cav.value; // Display the default slider value

/* Gera as sementes */
var slider_seed = document.getElementById("myRangeSeed");
var output_seed = document.getElementById("output_seed");
output_seed.innerHTML = slider_seed.value; // Display the default slider value


let game = new Game(slider_seed.value, slider_cav.value); // INÍCIO DO JOGO


// função on change, atualiza as cavidades para as cavidades do slider
slider_cav.onchange = function() {
  output_cav.innerHTML = this.value;
  
  game.tabuleiro.clean_board();  
  game = new Game(slider_seed.value, slider_cav.value);
}

// função on change, atualiza as sementes para as sementes do slider
slider_seed.onchange = function() {
  output_seed.innerHTML = this.value;
  
  game.tabuleiro.clean_board();  
  game = new Game(slider_seed.value, slider_cav.value);
}



const modalButtons = document.querySelectorAll('.modal-show, .modal-close'); // Get all buttons used for showing and hiding the modals

/* Butões para abrir e fechar os modals */
modalButtons.forEach(button => { // atach a click event listener to each button and pass it a named callback function
  button.addEventListener('click', showOrHideModal);
});

function showOrHideModal(evt){
	const currentButtonElement = evt.target;
  if(currentButtonElement.dataset.modalId) { // if the button has the data attribute modalId, it's a 'show' button
  	const targetModalId = currentButtonElement.dataset.modalId // get the target modal id from the data attribute
  	const targetModalElement = document.getElementById(targetModalId); // get the target modal element
      
    targetModalElement.classList.remove('modal-hidden'); // remove the CSS class used to hide it
  } else { // the button is a 'close' button
  	const parentModal = currentButtonElement.parentElement; // get the parent modal element
    parentModal.classList.add('modal-hidden'); // add the CSS class used to hide it

    document.querySelector('.gameOver').remove();
    game.tabuleiro.clean_board();  
    game = new Game(slider_seed.value, slider_cav.value);
  }
}