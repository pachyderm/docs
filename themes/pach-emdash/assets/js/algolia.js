const indexName = document.getElementById('activeVersion').getAttribute('data-algolia')
console.log(indexName)

const searchClient = algoliasearch('RUV2F528SR', '1f21e218181a4f87c5496cd574a88c70')
  // first value is app id, second is search only api key
  const search = instantsearch({
    indexName: indexName,
    searchClient, 
    searchFunction(helper) {
      if (helper.state.query) {
        helper.search()
      }
      if (!helper.state.query) {
        document.querySelector('#hits').innerHTML = ''
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
        input: ['is-full','white', 'rounded-4', 'sp-1']
      },
      templates: {
      },
    
    }),
    instantsearch.widgets.configure({
      hitsPerPage: 5,
    }),
    instantsearch.widgets.hits({
      container: '#hits',
      escapeHTML: false,
      cssClasses: {
        root: ['spread-center','modal', 'darken-5'],
        list: ['is-three-fifths','white', 'pr-1', 'rounded-1', 'brighten-1', 'is-fullsize-mobile'],
        item: ['spread'] },
      templates: {
        empty: `<div class="hit spread mt-5 pinned-top is-full darken-1 rounded-1 c-sp-1 m-1"> <div class="white text-center rounded-1"><h2 class="uppercase bold">No Results Found</h2>
        <div class="subtitle-1"> Could not locate results matching <strong>{{query}}</strong>. </div> `,
        item: `
          <div class="stack">
            <a href="{{relURI}}" class="sp-1 outlined rounded-1">
              <div class="hit spread c-pinned-center is-full c-mr-1">
                <div class="black gradient-lr-cold is-fit xxs rounded-1 darken-3 p-1">{{version}}</div>
                <div class="stack c-mb-1">
                  <p class="xxs uppercase is-fit">{{parent}}</p>
                  <h3 class="is-fit s extra-bold">{{title}}</h3>
                  <div class="xs">{{description}}</div>
                </div>
              </div>
            </a>
            <div class="xxs spread-right c-black c-mb-1 c-mr-1 c-fit">{{#tags}} <a href="/tags/{{.}}?&v={{version}}">{{.}}</a>{{/tags}}</div>
          </div>
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




