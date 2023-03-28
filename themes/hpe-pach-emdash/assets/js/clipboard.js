// listen for any element with the class of "clippy" to be clicked

var clippy = document.getElementsByClassName("clippy")
for (var i = 0; i < clippy.length; i++) {
    clippy[i].addEventListener("click", function() {
        // get the code block
        var code = this.parentNode.parentNode.querySelector("code")
        // select the code block
        var copied = code.innerText.replace(/^\s*\n/gm, '');
        navigator.clipboard.writeText(copied)

        this.innerHTML = '<img src="/images/copyClicked.svg">';
                // reset the button text after a few seconds
                setTimeout(function() {
                    this.innerHTML = '<img src="/images/copy.svg">';
                }.bind(this), 2000);
                
    })
}


