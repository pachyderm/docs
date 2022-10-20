 var elements = document.getElementsByTagName('pre');
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        if (element.innerText.length > 0) {

            // listen to the grandparent element for clicks
            element.parentElement.parentElement.addEventListener('click', function(e) {
                var code = this.getElementsByTagName('code')[0];
                var copied = code.innerText.replace(/^\s*\n/gm, '');
                navigator.clipboard.writeText(copied)
    
                this.getElementsByClassName('clippy')[0].innerHTML = '<img src="/images/copyClicked.svg">';
                // reset the button text after a few seconds
                setTimeout(function() {
                    this.getElementsByClassName('clippy')[0].innerHTML = '<img src="/images/copy.svg">';
                }.bind(this), 2000);
            })
        }
}

