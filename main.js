const modalButtons = document.querySelectorAll('.modal-show, .modal-close'); // Get all buttons used for showing and hiding the modals

const tabuleiro = document.getElementById('tabuleiro');
const top_cavidades = document.getElementById('top_cavidades');
const bottom_cavidades = document.getElementById('bottom_cavidades');
const top_armazem = document.querySelector('.armazem');
const bottom_armazem = document.querySelector('.armazem');

// Cardinal para ID

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
  }
  
}


/* Gera os armazens */
tabuleiro.prepend(createArmazem()); // Adiciona o primeiro armazem
tabuleiro.append(createArmazem()); // Adiciona o segundo armazem


/* Gera as cavidades */
var slider_cav = document.getElementById("myRangeCav");
var output_cav = document.getElementById("output_cav")
output_cav.innerHTML = slider_cav.value; // Display the default slider value

// Update the current Cav slider value (each time you drag the slider handle)
appendChildren(top_cavidades, items_cav(slider_cav.value));
appendChildren(bottom_cavidades, items_cav(slider_cav.value));

// função on change, atualiza as cavidades para as cavidades do slider
slider_cav.onchange = function() {
  output_cav.innerHTML = this.value;
  top_cavidades.innerHTML = ''; // Limpar o tabuleiro
  bottom_cavidades.innerHTML = ''; // Limpar o tabuleiro
  appendChildren(top_cavidades, items_cav(Number(this.value)));
  appendChildren(bottom_cavidades, items_cav(Number(this.value)));

  cavidadesTotal = document.querySelectorAll('.cavidade'); // atualiza o numero de cavidades
  displaySeeds(cavidadesTotal, output_seed.innerHTML); // gera as sementes
}


/* Gera as sementes */
var slider_seed = document.getElementById("myRangeSeed");
var output_seed = document.getElementById("output_seed");
output_seed.innerHTML = slider_seed.value; // Display the default slider value

var cavidadesTotal = document.querySelectorAll('.cavidade'); // tem de ser var ou let porque é alterado o número de cavidades

// Update the current Seed slider value (each time you drag the slider handle)
displaySeeds(cavidadesTotal, slider_seed.value);

// função on change, atualiza as sementes para as sementes do slider
slider_seed.onchange = function() {
  output_seed.innerHTML = this.value;
  cavidadesTotal.forEach(function(cav) { // Limpa as cavidades
    cav.innerHTML = '';
  });
  displaySeeds(cavidadesTotal, this.value);
}

// função que gera as sementes
function displaySeeds(cavidadesTotal, num){
  const numSeeds = num;
  cavidadesTotal.forEach(function(cav) {
    appendChildren(cav, items_seed(numSeeds));
  });
}


// Creates armazem class
function createArmazem(){ // Creates armazem class
  const arm = document.createElement('div');
  arm.classList.add('armazem', 'new');
  return arm;
}

// Creates cavity class
function createCavidade(){
  const cav = document.createElement('div');
  cav.classList.add('cavidade');
  return cav;
}

// Creates seed class
function createSeed(){
  const seed = document.createElement('div');
  seed.classList.add('feijao');
  return seed;
}


// Add child to parent
function appendChildren(parent, children) {
  children.forEach(function(child) {
    parent.appendChild(child);
  })
}


// Create numbers and push to array (cav)
function items_cav(numItems) {
	const cavidades = [];
	for(let i = 0; i < numItems; i++) {
  	const item = createCavidade();
    cavidades.push(item);
  }
	return cavidades;
}

// Create numbers and push to array (seed)
function items_seed(numItems) {
	const seeds = [];
	for(let i = 0; i < numItems; i++) {
  	const item = createSeed();
    seeds.push(item);
  }
	return seeds;
}



