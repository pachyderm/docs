const searchClient = algoliasearch('RUV2F528SR', '1f21e218181a4f87c5496cd574a88c70')
  // first value is app id, second is search only api key
  const search = instantsearch({
    indexName: 'pach_public',
    searchClient, 
    searchFunction(helper) {
      if (helper.state.query) {
        helper.search()
      }
      if (!helper.state.query) {
        document.querySelector('#hits').innerHTML = ''
        // get the input field with the clas ais-SearchBox-input 
        // and set the value to empty
        // helper.state.query = 'getting started + 2.3.x'
        // helper.search("")
      }
    },
  });
  
  search.addWidgets([
    instantsearch.widgets.searchBox({
      container: "#searchbox",
      placeholder: "Search...",
      showReset: false,
      showSubmit: false,
      autofocus: false,
      showLoadingIndicator: false,
      cssClasses: {
        form: ['spread'],
        submit: ['is-hidden'],
        reset: ['is-hidden'],
        input: ['is-full','white', 'rounded-4', 'p-1']
      },
      templates: {
      },
    
    }),
    instantsearch.widgets.configure({
      hitsPerPage: 8,
    }),
    instantsearch.widgets.hits({
      container: '#hits',
      escapeHTML: false,
      cssClasses: {
        root: ['algoliaHome', 'm-4'],
        list: ['spread-left', 'rounded-1', 'is-fullsize-mobile'],
        item: ['is-half', 'is-fullsize-mobile'] },
      templates: {
        empty: `<div class="hit spread mt-5 pinned-top is-full brighten-1 rounded-1 c-sp-1 m-1"> <div class=" text-center rounded-1"><h2 class="uppercase bold">No Results Found</h2>
        <div class="subtitle-1"> Could not locate results matching <strong>{{query}}</strong>. </div> `,
        item: `
          <div class="stack darken-2 rounded-1 move-l sp-1">
            <a href="{{relURI}}">
              <div class="hit spread c-pinned-center is-full c-mr-1">
                <div class="black gradient-lr-cold is-fit xxs rounded-1 darken-3 p-1">{{version}}</div>
                <div class="stack c-mb-1">
                  <p class="xs uppercase is-fit">{{parent}}</p>
                  <h3 class="is-fit m extra-bold">{{title}}</h3>
                  <div class="xs">{{description}}</div>
                </div>
              </div>
            </a>
          </div>
          <div class="xs spread-right c-black c-mb-2 c-mr-1 c-fit">{{#tags}} <a href="/tags/{{.}}?&v={{version}}">{{.}}</a>{{/tags}}</div>
          `
      },
      transformData: {
        item: function(hit) {
          hit.raw = JSON.stringify(hit, null, 2)
            return hit;
        }
      }
    })
  ])
  
  search.start()

