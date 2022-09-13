window.onload = function() {
    // get the list of links from the element with the id "arrowNav"
     let arrowNav = document.getElementById("arrowNav");

     var links = arrowNav.getElementsByTagName("a");

     // assign a number to each link
        for (var i = 0; i < links.length; i++) {
            links[i].setAttribute("tabindex", i + 1);
        }

    // get the window location 
    let currentLocation = window.location.href;

    // find the link that matches the current location
    let currentTabIndex = 0;

    for (var i = 0; i < links.length; i++) {
        if (links[i].href == currentLocation) {
            links[i].focus();
            currentTabIndex = links[i].getAttribute("tabindex"); 
        }
    }

    // add event listener to the document

    document.addEventListener("keydown", function(event) {
        var keyName = event.key

        if (keyName == "ArrowRight") {
            currentTabIndex++;
            // find the link with the current tab index
            for (var i = 0; i < links.length; i++) {
                if (links[i].getAttribute("tabindex") == currentTabIndex) {
                    links[i].focus();
                    // go to the url of the link
                    window.location.href = links[i].href;
                }
            }
        }

        if (keyName == "ArrowLeft") {
            currentTabIndex--;
            for (var i = 0; i < links.length; i++) {
                if (links[i].getAttribute("tabindex") == currentTabIndex) {
                    links[i].focus();
                    // go to the url of the link
                    window.location.href = links[i].href;
                }
            }
        } 
    });
}