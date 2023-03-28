// create a window event listener that checks if the user selects an element with the class hide.

window.addEventListener ('click', function (event) {
    // if the image is clicked, hide the notice

    if (event.target.classList.contains('hide')) {
        button = event.target;
        // grab the grandparent of the element that was clicked
        var notice = event.target.parentNode.parentNode.parentNode;
        // hide the second element in the notice
        notice.children[1].classList.toggle('is-hidden');
        // change button.src to "/images/collapse.svg"
        if (button.src.includes('collapse')) {
            button.src = "/images/expand.svg";
        }
        else {
            button.src = "/images/collapse.svg";
        }
    }
});

