let filterSet = new Set() 
let articleSet = new Set() 
let intersectionSet = new Set()

const potentialResults = document.getElementById('potentialResults')

if (potentialResults) {
    const articles = potentialResults.children
    // Push all articles to the articleSet to be filtered against the filterSet. 

    for(let i = 0; i < articles.length; i++){
        articleSet.add(articles[i])
    }

    // Add or remove filters to the filterSet.

    function Filter(filter, el){

        if(!filterSet.has(filter)){
        filterSet.add(filter);

        } else if (filterSet.has(filter)){
            filterSet.delete(filter);
        }

    intersect()

    el.classList.toggle('purple');
    el.classList.toggle('black');

    console.log(filterSet)
    console.log(intersectionSet)
    }
        

    // Filter the articleSet against the filterSet.

    function intersect(){

        // Add articles to the intersectionSet if they match the filterSet.
        articleSet.forEach(article => {
            let tags = article.getAttribute('data-tags'). split(' ')
            let intersection = tags.filter(tag => filterSet.has(tag))
            if(intersection.length > 0){
                intersectionSet.add(article)
            }

        })

        // If the filterSet has more than one filter, make sure the intersectionSet's articles have all the filters.

        if(filterSet.size > 1){
            intersectionSet.forEach(article => {
                let tags = article.getAttribute('data-tags').split(' ')
                let intersection = tags.filter(tag => filterSet.has(tag))
                if(intersection.length < filterSet.size){
                    intersectionSet.delete(article)
                }
            } )
        }

        // If the filterset is empty, clear the intersectionSet.
        if (filterSet.size == 0){
            intersectionSet.clear()
        }
        // Update the classList to show each article in the intersectionSet.

        articleSet.forEach (article => {
            if (intersectionSet.has(article)){
                article.classList.remove('is-hidden')
            } else {
                article.classList.add('is-hidden')
            }
        })
    }
}






