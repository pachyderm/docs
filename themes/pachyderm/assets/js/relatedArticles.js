// toggles the TOC (id 'zzz') with the related articles (id 'related-articles')
const relatedArticlesContainer = document.getElementById('zzz');
const showRelated = document.getElementById('see-related')

if (relatedArticlesContainer && showRelated) {
    showRelated.addEventListener('click', function() {
        document.getElementById('zzz').classList.toggle('is-hidden');
        document.getElementById('related-articles').classList.toggle('is-hidden');

    } , false); 
}
