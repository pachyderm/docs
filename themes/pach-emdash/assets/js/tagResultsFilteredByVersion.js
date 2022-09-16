// get the v parameter from the URL

var url_string = window.location.href;
var url = new URL(url_string);
var v = url.searchParams.get("v");

console.log(v);

if (v === null) {

} else {

    // get all of the child elements from the element with the id of "tags"

    var tags = document.getElementById("tags").children;
    console.log(tags);

    // loop through the child elements

    for (var i = 0; i < tags.length; i++) {
        // if the child's class does not contain the v parameter, hide it
        if (tags[i].classList.contains(v) === false) {
            tags[i].classList.add("is-hidden");
        }
    }
}
