function darkMode() {
    var body = document.getElementsByTagName('body')[0];
    var button = document.getElementById('darkModeButton');

    // Toggle dark mode for html element 
    body.classList.toggle("black");
    body.classList.toggle("white");
    // Toggle grayscale for darkmode button (moon icon)
    button.classList.toggle("grayscale");
   // Store the current theme in local storage
    localStorage.setItem("theme-dark-mode", body.classList.contains("black"));
}

// Check if the user has previously selected dark mode
if (localStorage.getItem("theme-dark-mode") == "true") {
    darkMode();
}
