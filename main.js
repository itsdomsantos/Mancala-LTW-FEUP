const modalButtons = document.querySelectorAll('.modal-show, .modal-close'); // Get all buttons used for showing and hiding the modals

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


var slider = document.getElementById("myRange");
var output = document.getElementById("output")
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}

// Creates cavity class
function createCavidade(){
  const cav = document.createElement('div');
  cav.classList.add('cavidade', 'new');
  return cav;
}

// Add child to parent
function appendChildren(parent, children) {
  children.forEach(function(child) {
    parent.appendChild(child);
  })
}

const top_cavidades = document.getElementById('top_cavidades');
const bottom_cavidades = document.getElementById('bottom_cavidades');

// Create numbers and push to array
function items(numItems) {
	const cavidades = [];
	for(let i = 0; i < numItems; i++) {
  	const item = createCavidade();
    cavidades.push(item);
  }
	return cavidades;
}

// Appends certain number of Items
appendChildren(top_cavidades, items(3));
appendChildren(bottom_cavidades, items(2));