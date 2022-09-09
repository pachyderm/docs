function darkMode() {

    var html = document.getElementsByTagName('html')[0];

    var directory = document.getElementById('directory');
    var button = document.getElementById("dark-mode-button");
    var backButton = document.getElementById("back-arrow-left");
    var cards = document.getElementsByClassName("card-buttons");
    var seriesButton = document.getElementById("series-button");

    // Toggle dark mode for html element 
    html.classList.toggle("theme-dark-mode");


    // Toggle darkmode for each card 
    if (cards){
        for (var i = 0; i < cards.length; i++) {
            cards[i].classList.toggle("is-black");
            cards[i].classList.toggle("is-white");
        }
    }

   // Toggle Darkmode for the directory 
   if (directory){ 
    for (var i = 0; i < directory.children.length; i++) {
        for (var j = 0; j < directory.children[i].children.length; j++) {
            directory.children[i].children[j].classList.toggle("is-black");
        }
    }
   }

   // Toggle Darkmode for the back button on pages that aren't the home page
    if (backButton){
        backButton.classList.toggle("is-primary");
        backButton.classList.toggle("is-white");
    }

    // Toggle Darkmode for the series button on single pages. 

    if (seriesButton){
        seriesButton.classList.toggle("is-primary");
        seriesButton.classList.toggle("is-white");
    }

   // Toggle Darkmode for Darkmode Button
   if (button.classList.contains("is-black")) {
    button.classList.remove("is-black");
    button.innerText = "☀️";
   } else {
    button.classList.add("is-black");
    button.innerText = "🌙";
   }
    
   // Store the current theme in local storage
    localStorage.setItem("theme-dark-mode", html.classList.contains("theme-dark-mode"));



}

// Check if the user has previously selected dark mode
if (localStorage.getItem("theme-dark-mode") == "true") {
    darkMode();
}
