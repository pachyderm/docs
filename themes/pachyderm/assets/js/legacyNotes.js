// find all paragraphs that begin with !!!

var notes = document.getElementsByTagName("p");
var noteArray = [];
for (var i = 0; i < notes.length; i++) {
    if (notes[i].innerHTML.substring(0, 3) === "!!!") {
        noteArray.push(notes[i]);
    }
}

// add the notice class to the paragraphs that begin with !!!

for (var i = 0; i < noteArray.length; i++) {
    noteArray[i].classList.add("notification");
    // add a button element inside the paragraph
    var button = document.createElement("button");
    button.classList.add("delete");
    noteArray[i].appendChild(button);

    /// remove !!! from the beginning of the paragraph
    noteArray[i].innerHTML = noteArray[i].innerHTML.substring(3);

    // remove any whitespace from the beginning of the paragraph
    noteArray[i].innerHTML = noteArray[i].innerHTML.trim();

    // if the next word is "note", remove it
    if (noteArray[i].innerHTML.substring(0, 4) === "Info" | "Note" ) {
        noteArray[i].innerHTML = noteArray[i].innerHTML.substring(4);
        // add info class to the paragraph
        noteArray[i].classList.add("info");
    }
    // if the next word is "warning", remove it
    if (noteArray[i].innerHTML.substring(0, 7) === "Warning") {
        noteArray[i].innerHTML = noteArray[i].innerHTML.substring(7);
        // add warning class to the paragraph
        noteArray[i].classList.add("info");
    }
    // if the next word is "attention", remove it
    if (noteArray[i].innerHTML.substring(0, 9) === "Attention") {
        noteArray[i].innerHTML = noteArray[i].innerHTML.substring(9);
        // add attention class to the paragraph
        noteArray[i].classList.add("warning");
    }
    // if the next word is "Important", remove it
    if (noteArray[i].innerHTML.substring(0, 9) === "Important") {
        noteArray[i].innerHTML = noteArray[i].innerHTML.substring(9);
        // add attention class to the paragraph
        noteArray[i].classList.add("tip");
    }

    // if the next word is "Example", remove it
    if (noteArray[i].innerHTML.substring(0, 7) === "Example") {
        noteArray[i].innerHTML = noteArray[i].innerHTML.substring(7);
        // add attention class to the paragraph
        noteArray[i].classList.add("info");
    }
}




console.log(notes)
