 var elements = document.getElementsByTagName('pre');
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        if (element.innerText.length > 0) {
         
            var copyButton = document.createElement('button');
            copyButton.classList.add( 'clippy', 'p-1', 'darken-1', 'rounded-3', 'uppercase', 'xxs', 'is-fit', 'pinned-end');

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