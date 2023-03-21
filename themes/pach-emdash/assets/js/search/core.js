/* global instantsearch */

import { groupedHitsWidget } from "./groupedHitsWidget";
import { refinementTemplate } from "./refinementTemplate";
import { client } from "./configureIndex.js";
const indexName = document.getElementById('activeVersion')?.getAttribute('data-algolia') || 'test-latest';
const darkModeColor = localStorage.getItem("theme-dark-mode") === "true" ? "black" : "white";


console.log("client is", client)


const search = instantsearch({
  indexName: indexName,
  searchClient: client,
  searchFunction(helper) {
    // if user presses "/" key, focus on search input
    document.addEventListener('keydown', function (event) {
      if (event.key === '/') {
        // focus the input with the class ais-SearchBox-input
        document.querySelector('.ais-SearchBox-input').focus();
        // do not type the "/" character in the input
        event.preventDefault();
      }
    });
    // add the darkmodeColor class to the searchResultsContainer
    document.getElementById('searchResultsContainer').classList.add(darkModeColor);
    if (helper.state.query) {
      // display searchResultsContainer 
      document.getElementById('searchResultsContainer').style.display = 'block';
      helper.search();
    }
    if (!helper.state.query) {
      // hide searchResultsContainer 
      document.getElementById('searchResultsContainer').style.display = 'none';
      
    }
  },
});

// Uncomment the following widget to add hits list.

search.addWidget(
  groupedHitsWidget({
    container: "#searchPageHits",
    attribute: "parent", // Replace "parentAttribute" with the actual attribute name.
  })
);

// Uncomment the following widget to add a search bar.

search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#main-searchbox",
    placeholder: "Search articles",
    autofocus: false,
    templates: {
      submit: '',
      reset: '', 
      loadingIndicator: ''
    },
    cssClasses: {
      form: ['spread', ],
      submit: ['is-hidden'],
      reset: ['is-hidden'],
      input: ['sp-1', 'inherit-color', 'meow']
    },
  })
); 

// Uncomment the following widget to add search stats.

search.addWidget(
  instantsearch.widgets.stats({
    container: "#stats",
    templates: {
      text(data) {
        const stats = data 
        return `
        ⚡️ ${stats.nbPages} results found in ${stats.processingTimeMS}ms
       `;
      }
    }
  })
);

// Uncomment the following widget to add categories list.

search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#categories",
    attribute: "tags",
    autoHideContainer: false,
    templates: {
      header: "Tags",
      item(refinement) {
        return refinementTemplate(refinement);
      }
    },
  })
); 

// Uncomment the following widget to add pagination.

search.addWidget(
  instantsearch.widgets.pagination({
    container: "#pagination",

  })
);


search.start();

