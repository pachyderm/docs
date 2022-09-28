// find the element with the id "activeVersion" and get it's data-algolia attribute value 

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
        form: ['spread','rounded-4' ],
        submit: ['is-hidden'],
        reset: ['is-hidden'],
        input: ['is-full' 'p-1', 'm','inherit-color']
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
        root: ['algoliaHome', 'mx-4'],
        list: ['spread-left', 'rounded-1', 'is-fullsize-mobile'],
        item: ['is-half', 'is-fullsize-mobile'] },
      templates: {
        empty: `<div class="hit spread mt-5 pinned-top is-full brighten-1 rounded-1 c-sp-2 m-2"> <div class=" text-center rounded-1"><h2 class="uppercase bold">No Results Found</h2>
        <div class="subtitle-1"> Could not locate results matching <strong>{{query}}</strong>. </div> `,
        item: `
          <div class="stack outlined rounded-1 move-l sp-2">
            <a href="{{relURI}}">
              <div class="hit spread c-pinned-center is-full c-mr-2">
                <div class="stack c-mb-2">
                  <div class="xs uppercase is-fit">{{parent}}</div>
                  <h3 class="is-fit l extra-bold">{{title}}</h3>
                  <div class="s">{{description}}</div></div>
                </div>
              </div>
            </a>
                      <div class="xs spread-right c-black c-mt-3 c-mr-2 c-fit">{{#tags}} <a href="/tags/{{.}}?&v={{version}}">{{.}}</a>{{/tags}} <div class="is-invisible my-3"></div></div>
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

