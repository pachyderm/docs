let codeContainer = `<section class="darken-2 rounded-1  sp-1"> 
            <div class="spread-between">
                <button class="is-fit m">📖</button>
                <button class="is-fit darken-1 sp-1 rounded-3 uppercase xxs">Copy</button>
            </div>
            <div class="content">
                ${meow}
            </div>
            </section>`

// get all code blocks that are inside a pre tag

let codeBlocks = document.getElementsByTagName("pre");

// for each code block, create a codeContainer and insert it before the code block with the content in ${meow}

for (var i = 0; i < codeBlocks.length; i++) {
    let meow = codeBlocks[i].innerHTML;
    codeBlocks[i].innerHTML = codeContainer;
    codeBlocks[i].parentNode.insertBefore(codeBlocks[i], codeBlocks[i].previousSibling);
}