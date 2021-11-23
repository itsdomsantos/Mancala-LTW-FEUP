const draggables = document.querySelectorAll('.draggable') /* Sementes */
const containers = document.querySelectorAll('.cavidades, .cavidades2, .armazem1, .armazem2') /* Depósito de sementes */


/* Loop que trata do Drag */
draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

/* Loop que trata do Drop */
containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault()
        const draggable = document.querySelector('.dragging')
        container.appendChild(draggable)
    })

})

