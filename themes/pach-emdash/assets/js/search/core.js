/* global instantsearch */

import { hitTemplate } from "./hitTemplate";
import { refinementTemplate } from "./refinementTemplate";
import { client } from "./configureIndex.js";

const search = instantsearch({
  indexName: "demo_media",
  searchClient: client,
});

// Uncomment the following widget to add hits list.

search.addWidget(
  instantsearch.widgets.hits({
    container: "#searchPageHits",
    templates: {
      empty: "No results found.",
      item(hit) {
        return hitTemplate(hit);
      }
    }
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
      body(hit) {
        return `<span role="img" aria-label="emoji">⚡️</span> <strong>${hit.nbHits}</strong> results found ${
          hit.query != "" ? `for <strong>"${hit.query}"</strong>` : ``
        } in <strong>${hit.processingTimeMS}ms</strong>`;
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

