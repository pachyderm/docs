// check if the page has an element with data-type="wizard"

if (document.querySelector('[data-type="wizard"]')) {
    // grab the wizard element
    let wizard = document.querySelector('[data-type="wizard"]')

    // get each child step element with data-wizard-id attribute
    let wizardSteps = wizard.querySelectorAll('[data-wizard-id]')

    // get all result elements with the data-wizard-answer attribute
    let answers = wizard.querySelectorAll('[data-wizard-answer]')
    
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

        // compare the text of the buttons with the data-wizard-answer attribute and show the result
        answers.forEach((answer) => {
            // get the text of the data-wizard-answer attribute
            let answerText = answer.getAttribute('data-wizard-answer')
            // turn the activeButtonText array into a string
            let activeButtonTextString = activeButtonText.join('/')
            console.log(answerText)
            console.log(activeButtonTextString)
            // if the the activeButtonText is included in the answerText, show the answer
            if (activeButtonTextString === answerText) {
                answer.classList.remove('is-hidden')
            }
            // if the the activeButtonText is not included in the answerText, hide the answer
            else {
                answer.classList.add('is-hidden')
            }
            
        } )

    }

}



