// check if the page has an element with data-type="wizard"

if (document.querySelector('[data-type="wizard"]')) {
    // grab the wizard element
    let wizard = document.querySelector('[data-type="wizard"]')

    // get each child step element with data-wizard-id attribute
    let wizardSteps = wizard.querySelectorAll('[data-wizard-id]')

    // get all result elements with the data-wizard-answer attribute
    let answers = wizard.querySelectorAll('[data-wizard-answer]')

    let answerText = ""
    
    //show pre-selected answer if any
    getAnswers()

    // listen for click on button elements within each step
    wizardSteps.forEach((step) => {
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

                getAnswers()
            })
        }) 
    })

    function getAnswers(){

        // get all buttons with the purple class
        let activeButtons = wizard.querySelectorAll('button.purple')

        // get the text of all the buttons with the purple class
        let activeButtonText = []

        activeButtons.forEach((button) => {
            activeButtonText.push(button.getAttribute('data-wizard-option'))
        })

        let convertedText = activeButtonText.join('/')


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



