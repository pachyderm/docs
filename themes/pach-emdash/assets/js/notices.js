// create a window event listener that checks if the user selects an element with the class delete.

window.addEventListener ('click', function (event) {
    if (event.target.classList.contains('hide')) {
        // grab the grandparent of the element that was clicked
        var notice = event.target.parentNode.parentNode;
        // hide the second element in the notice
        notice.children[1].classList.toggle('is-hidden');
    }
});

