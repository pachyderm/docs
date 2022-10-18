function styleTOC(){
    var zzz = document.getElementById('zzz')
    var pageNodes = document.getElementsByTagName('*')
    var headings = []
    var toc = []

    if (zzz) {

     // Get every header in the document

    for (var i = 0; i < pageNodes.length; i++) {
        var node = pageNodes[i]
        if (node.nodeType == 1) {
            var nodeName = node.nodeName.toLowerCase()
            if (nodeName == 'h2' || nodeName == 'h3') {
                headings.push(node)
            }
        }
    }

    // Create a TOC from the headings, build links, and apprend to the TOC div found in featureTOC.html 
   
    for (var i = 0; i < headings.length; i++) {
        var heading = headings[i].nodeName
        var headingText = headings[i].innerText

        // remove the ' # ' from the heading text
        var headingText = headingText.replace(/#/g, '')
        var li = document.createElement('div')
        var link = document.createElement('a')

        li.classList.add('spread-left','s', 'c-mb-2')
        link.href = '#' + headings[i].id
        link.role = headings[i].id;

        if (headingText.length > 35) {
            link.innerText =  headingText.substring(0, 27) + '...'
        } else {
             link.innerText = headingText;
        }
        link.classList.add( )
        if (heading == 'H3') {
            link.classList.add('ml-1', 'is-fit','thin', 'publicSans')
        }
        if (heading == 'H2') {
            link.classList.add('is-fit')
        }

        li.appendChild(link)
        toc.push(link)
        zzz.appendChild(li)
    }

    // if scrolls past a header, add 's' class (font size) to the header and remove it from the previous header

    window.addEventListener('scroll', function() {
        var prevHeader = null; 
        var activeHeader = new Set() 
        for (var i = 0; i < headings.length; i++) {
            if (window.scrollY > headings[i].offsetTop - 100) {
                activeHeader = headings[i];
                if (activeHeader.id == toc[i].role) {
                    toc[i].classList.add('purple')
     
                } 
            } 
        }
        for (var i =0; i < toc.length; i++) {
            if (toc[i].classList.contains('purple') && toc[i].role != activeHeader.id) {
                toc[i].classList.remove('purple')
            }
        }
    })
    }

}

styleTOC()