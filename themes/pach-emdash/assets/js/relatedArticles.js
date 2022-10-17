 // when the button with id "see-related" is clicked, scroll to the element with the id "related-articles" without using jQuery


var seeRelated = document.getElementById('see-related');
var relatedArticles = document.getElementById('related-articles');

seeRelated.addEventListener('click', function() {
    relatedArticles.scrollIntoView({behavior: "smooth"});
});

