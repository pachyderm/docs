import { groupedHitsWidget } from "./groupedHitsWidget";
import { refinementTemplate } from "./refinementTemplate";
import { client } from "./configureIndex.js";

// Pachyderm Docs specific Settings and Functions
const indexName = document.getElementById('activeVersion')?.getAttribute('data-algolia') || 'latest';
const darkModeColor = localStorage.getItem("theme-dark-mode") === "true" ? "black" : "white";

function handleSearch(helper) {
  // Shows/hides search results based on query and listens for '/' keypress to focus search box.
  const searchResultsContainer = document.getElementById('searchResultsContainer');
  const searchBox = document.querySelector('.ais-SearchBox-input');

  searchResultsContainer.classList.add(darkModeColor);
  searchResultsContainer.style.display = helper.state.query ? 'block' : 'none';

  document.addEventListener('keydown', event => {
    if (event.key === '/') {
      searchBox.focus();
      event.preventDefault();
    }
  });
}

// Algolia InstantSearch Settings

const search = instantsearch({
  indexName: indexName,
  searchClient: client,
  searchFunction(helper) {
    handleSearch(helper);
    if (helper.state.query) {
      helper.search();
    }
  },
});

const widgets = [
  groupedHitsWidget({
    container: "#searchPageHits",
    attribute: "parent",
  }),
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
      form: ['spread'],
      submit: ['is-hidden'],
      reset: ['is-hidden'],
      input: ['sp-1', 'inherit-color', 'meow']
    },
  }),
  instantsearch.widgets.stats({
    container: "#stats",
    templates: {
      text({ nbHits, nbPages, processingTimeMS }) {
        return `
          ⚡️ ${nbHits} results found across ${nbPages} pages in ${processingTimeMS}ms. Docs version: ${indexName}.
        `;
      }
    }
  }),
  instantsearch.widgets.refinementList({
    container: "#categories",
    attribute: "tags",
    autoHideContainer: false,
    templates: {
      header: "Tags",
      item: refinementTemplate
    },
    cssClasses: {
      root: ['sticky', 'pt-5']
    }
  }),
  instantsearch.widgets.pagination({
    container: "#pagination",
  })
];

widgets.forEach(widget => search.addWidget(widget));

search.start();
