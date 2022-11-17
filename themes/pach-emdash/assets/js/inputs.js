// check a document for input elements.

if (document.querySelector('input')) {
  // get all input elements.

    const inputs = document.querySelectorAll('input');

    // listen for input events on each input element.

    inputs.forEach(input => {
        input.addEventListener('input', event => {
            // if the input element has a value, add the class 'has-value'.
            // otherwise, remove the class 'has-value'.
    
            if (event.target.value) {
            event.target.classList.add('purple');
            } else {
            event.target.classList.remove('purple');
            }
        });
        });

    
}