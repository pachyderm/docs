const darkModeColor = localStorage.getItem("theme-dark-mode") === "true" ? "black" : "white";

const indexName = document.getElementById('activeVersion').getAttribute('data-algolia');

const searchClient = algoliasearch('RUV2F528SR', '1f21e218181a4f87c5496cd574a88c70');

const search = instantsearch({
  indexName,
  searchClient,
});

const autocomplete = instantsearch.widgets.autocomplete({
  container: "#searchbox",
  placeholder: "Search...",
  showReset: false,
  showSubmit: false,
  autofocus: false,
  showLoadingIndicator: false,
  cssClasses: {
    form: ['spread', ],
    submit: ['is-hidden'],
    reset: ['is-hidden'],
    input: ['sp-1', 'inherit-color', 'meow']
  },
  templates: {
    dropdownMenu:
      '<div class="aa-dataset-{{name}}"></div>'
  },
  appendTo: '#searchbox'
});

search.addWidgets([
  autocomplete({
    container: '#searchbox',
    placeholder: 'Search...',
    openOnFocus: true,
    minLength: 2,
    templates: {
      suggestion: function(suggestion) {
        return suggestion._highlightResult.title.value;
      },
      footer: function(query) {
        return `See all results for ${query} <a href="/search?q=${query}">here</a>`;
      },
    },
    cssClasses: {
      root: ['aa-input-container'],
      input: ['aa-input', 'sp-1', 'inherit-color', 'meow'],
      dropdownMenu: ['aa-dropdown-menu'],
      suggestion: ['aa-suggestion', 'is-accordion is-fit'],
      footer: ['aa-footer'],
    },
  }),
  instantsearch.widgets.configure({
    // widget options...
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    escapeHTML: false,
    cssClasses: {
      root: ['spread-center','modal', `${darkModeColor}`,],
      list: ['is-three-fifths','is-fullsize-mobile','pt-7' ],
      item: ['spread', 'pr-3']
    },
    templates: {
      empty: `<div class="hit spread mt-5 pinned-top is-full darken-1 rounded-1 c-sp-2 m-2"> <div class="white text-center rounded-1"><h2 class="uppercase bold">No Results Found</h2>
        <div class="subtitle-1"> Could not locate results matching <strong>{{query}}</strong>. </div> `,
      item: `
        <div class="stack outlined rounded-4 move-l m-2 p-1">
        <a href="#" class="m-1 c-m-1">
        <div class="hit spread c-pinned-center is-full ">
          <div class="stack c-mb-2">
            <div class="xxs uppercase is-fit">{{parent}}</div>
            <h3 class="is-fit m extra-bold">{{title}}</h3>
            <div class="xs">{{description}}</div>
          </div>
        </div>
      </a>
      <div class="xs spread-right c-black m-1 c-mr-2 c-px-1 c-fit">{{#tags}} <a href="/tags/{{.}}?&v={{version}}">{{.}}</a>{{/tags}}</div>
    </div>
  `
    },
  }),
]);

search.start();
