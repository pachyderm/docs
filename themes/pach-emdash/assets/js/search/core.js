/* global instantsearch */

import { groupedHitsWidget } from "./groupedHitsWidget";
import { refinementTemplate } from "./refinementTemplate";
import { client } from "./configureIndex.js";

const search = instantsearch({
  indexName: "demo_media",
  searchClient: client,
  searchFunction(helper) {
    if (helper.state.query) {
      helper.search();
    }
    if (!helper.state.query) {
      // search for "pipeline"
      helper.setQuery("pipeline").search();
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
    }
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

