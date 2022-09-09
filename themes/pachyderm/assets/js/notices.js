// create a window event listener that checks if the user selects an element with the class delete.

window.addEventListener ('click', function (event) {
    if (event.target.classList.contains('delete')) {
        event.target.parentElement.remove();
        // remove child elements
        event.target.parentElement.removeChild (event. target. parentElement. firstChild);
    }
});

