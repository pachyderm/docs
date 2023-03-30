// check if the page has an element with data-type="wizard"

if (document.querySelectorAll('[data-type="wizard"]')) {
    // grab all wizard elements
    var wizards = document.querySelectorAll('[data-type="wizard"]');
    let allAnswers = document.querySelectorAll('[data-wizard-answer]');
    let answerText = ""
    

    
    wizards.forEach(function(wizard) {
        // get each child step element with the data-wizard-id attribute
        let steps = wizard.querySelectorAll('[data-wizard-id]');
        let answers = wizard.querySelectorAll('[data-wizard-answer]');
        getAnswers({wizard, answers}) 
        // listen for click on button elements within each step
        steps.forEach((step) => {
            // get all of the buttons within the step
            let buttons = step.querySelectorAll('button')

            // listen for click on each button
            buttons.forEach((button) => {
                button.addEventListener('click', (e) => {
                    // add purple class to the clicked button
                    e.target.classList.add('purple')
                    // remove purple class from the other buttons
                    buttons.forEach((button) => {
                        if (button !== e.target) {
                            button.classList.remove('purple')
                        }
                    } )

                    getAnswers({wizard, answers})
                })
            }) 
        })
    });



    function getAnswers({wizard, answers}){

        // get all buttons with the purple class
        let activeButtons = wizard.querySelectorAll('button.purple')

        // get the text of all the buttons with the purple class
        let activeButtonText = []

        activeButtons.forEach((button) => {
            activeButtonText.push(button.getAttribute('data-wizard-option'))
        })

        let convertedText = activeButtonText.join('/').toLowerCase()

        // hide all other answers
        answers.forEach((answer) => {
            let value = answer.getAttribute('data-wizard-answer')
            console.log(`value: ` + value)
            console.log(`convertedText: ` + convertedText)
            if (value !== convertedText) {
                answer.classList.add('is-hidden')
            } else {
                answer.classList.remove('is-hidden')
            }
        })
    }
}



