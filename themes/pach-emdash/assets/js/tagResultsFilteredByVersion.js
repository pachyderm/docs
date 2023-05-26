// get the v parameter from the URL

var url_string = window.location.href
var url = new URL(url_string)
var v = url.searchParams.get("v")
var tags = document.getElementById("tags")?.children;

if (v === null) {

  // loop through the child elements

  for (var i = 0; i < tags.length; i++) {
    // if the child does not have data-latest-release = "latest", hide the child
    if (tags[i].dataset.latestRelease !== "latest") {
      tags[i].classList.add("is-hidden");
    }
    }
} else {

    // loop through the child elements

    for (var i = 0; i < tags.length; i++) {
        // if the child's class does not contain the v parameter, hide it
        if (tags[i].classList.contains(v) === false) {
            tags[i].classList.add("is-hidden")
        }
    }
}
