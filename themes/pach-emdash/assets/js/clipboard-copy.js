function addCopyButton() {
    var elements = document.getElementsByTagName('pre');
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        if (element.innerText.length > 0) {
         
            var copyButton = document.createElement('button');
            copyButton.classList.add('clippy', 'has-background-black', 'has-text-white', 'has-text-weight-bold', 'is-size-7', 'is-pulled-right', 'is-marginless', 'is-paddingless', 'is-radiusless', 'is-shadowless');
            copyButton.innerHTML = 'Copy';
            element.appendChild(copyButton);

            element.addEventListener('click', function(e) {
                var code = this.getElementsByTagName('code')[0];
                navigator.clipboard.writeText(code.innerText)
                // update the button text
                this.getElementsByClassName('clippy')[0].innerHTML = 'Copied!';
                // reset the button text after a few seconds
                setTimeout(function() {
                    this.getElementsByClassName('clippy')[0].innerHTML = 'Copy';
                }.bind(this), 2000);
            }.bind(element));
        }
    }
}

   

addCopyButton()



