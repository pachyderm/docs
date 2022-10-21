// check if the page has an element with data-type="wizard"

if (document.querySelector('[data-type="wizard"]')) {
    // grab the element
    let wizard = document.querySelector('[data-type="wizard"]')
    console.log(wizard)
    // get each child element with data-wizard-id attribute
    let wizardSteps = wizard.querySelectorAll('[data-wizard-id]')
    console.log(wizardSteps)

    // listen for click on each step
    wizardSteps.forEach(step => {
        step.addEventListener('click', () => {
            // get the data-wizard-id value
            let stepId = step.getAttribute('data-wizard-id')
            console.log(stepId)
            // get the element with the data-wizard-id value
            let stepContent = wizard.querySelector(`[data-wizard-id="${stepId}"]`)
            console.log(stepContent)
            // remove the active class from all steps
            wizardSteps.forEach(step => {
                step.classList.remove('active')
            })
            // add the active class to the clicked step
            step.classList.add('active')
            // remove the active class from all step content
            wizardSteps.forEach(step => {
                step.classList.remove('active')
            })
            // add the active class to the step content
            stepContent.classList.add('active')
        })
    } )
}