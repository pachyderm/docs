// get all code blocks with the class language-mermaid

//let preBlocks = document.querySelectorAll('pre');

// for each code block in a pre tag, check if it has the class language-mermaid

document.querySelectorAll('pre').forEach(function(preBlock) {
    let pre = preBlock; 
    let codeBlock = pre.querySelector('code');
    if (codeBlock.classList.contains('language-mermaid')) {
        // get the text content of the code block
        let code = codeBlock.textContent;
        // create a new div to hold the mermaid diagram
        let mermaidDiv = document.createElement('div');
        // add the mermaid class to the div
        mermaidDiv.classList.add('mermaid');
        // center the diagram
        mermaidDiv.style.textAlign = 'center';
        // add the mermaid diagram code to the div
        mermaidDiv.textContent = code;
        // add the div to the dom and remove the code block
        preBlock.parentNode.insertBefore(mermaidDiv, preBlock.nextSibling);
        preBlock.remove();
    }
});
