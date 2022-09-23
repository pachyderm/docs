// get all code blocks with the class language-mermaid

let preBlocks = document.querySelectorAll('pre');

// for each code block in a pre tag, check if it has the class language-mermaid

preBlocks.forEach(function(preBlock) {
    let codeBlock = preBlock.querySelector('code');
    if (codeBlock.classList.contains('language-mermaid')) {
        // if it does, get the text content of the code block
        let code = codeBlock.textContent;
        // create a new div to hold the mermaid diagram
        let mermaidDiv = document.createElement('div');
        // add the mermaid class to the div
        mermaidDiv.classList.add('mermaid', 'brighten-3', 'rounded-1', 'py-2');
        // center the diagram
        mermaidDiv.style.textAlign = 'center';
        // add the mermaid diagram code to the div
        mermaidDiv.textContent = code;
        // add the div to the pre tag
        preBlock.appendChild(mermaidDiv);
        // remove the code block from the pre tag
        preBlock.removeChild(codeBlock);
        // remove the button from the pre tag
        preBlock.removeChild(preBlock.querySelector('button'));
        // make the pre background transparent
        preBlock.setAttribute('style', 'background: transparent !important;');
    }

});
