// create a window event listener that checks if the user selects an element with the class delete.

window.addEventListener ('click', function (event) {
    if (event.target.classList.contains('hide')) {
        // remove the great grandparent of the element that was clicked
        event.target.parentNode.parentNode.remove();

    }
});

