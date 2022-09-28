 var elements = document.getElementsByTagName('pre');
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        if (element.innerText.length > 0) {

            // listen to the grandparent element for clicks
            element.parentElement.parentElement.addEventListener('click', function(e) {
                var code = this.getElementsByTagName('code')[0];
                navigator.clipboard.writeText(code.innerText)
                // remove extra lines from the copied text
                .then(() => {
                    code.innerText = code.innerText.replace(/^\s*\n/gm, '');
                })
                this.getElementsByClassName('clippy')[0].innerHTML = 'Copied!';
                // reset the button text after a few seconds
                setTimeout(function() {
                    this.getElementsByClassName('clippy')[0].innerHTML = 'Copy';
                }.bind(this), 2000);
            })
        }
}
