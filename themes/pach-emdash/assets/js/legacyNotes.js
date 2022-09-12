// find all paragraphs that begin with !!!

var notes = document.getElementsByTagName("p");
var noteArray = [];
for (var i = 0; i < notes.length; i++) {
    if (notes[i].innerHTML.substring(0, 3) === "!!!") {
        noteArray.push(notes[i]);
    }
}

// for each note, create a noteContainer and insert it before the note with the content in ${meow}

for (var i = 0; i < noteArray.length; i++) {
    var meow = noteArray[i].innerHTML.substring(3);
    // let type equal the first string after the !!!

    let noteContainer = `<section class="darken-2 rounded-1  sp-1"> 
    <div class="spread-between">
        <button class="is-fit m">📖</button>
        <button class="is-fit darken-1 sp-1 rounded-3 uppercase xxs hide">hide</button>
    </div>
    <div class="content">
        ${meow}
    </div>
    </section>`

    noteArray[i].innerHTML = noteContainer;

    // add to the dom before the note

    noteArray[i].parentNode.insertBefore(noteArray[i], noteArray[i].previousSibling);

}




