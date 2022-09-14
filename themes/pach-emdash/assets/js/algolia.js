const searchClient = algoliasearch('RUV2F528SR', '1f21e218181a4f87c5496cd574a88c70');
  
  const search = instantsearch({
    indexName: 'pach_public',
    searchClient, 
    searchFunction(helper) {
      if (helper.state.query) {
        helper.search();
      }
      if (!helper.state.query) {
        document.querySelector('#hits').innerHTML = '';
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
        input: ['is-full','black', 'rounded-1', 'sp-1']
      },
      templates: {
      },
    
    }),
    instantsearch.widgets.configure({
      hitsPerPage: 6,
    }),
    instantsearch.widgets.hits({
      container: '#hits',
      escapeHTML: false,
      cssClasses: {
        root: ['spread-center','modal', 'darken-3'],
        list: ['is-three-fifths','white', 'pr-1', 'rounded-1', 'brighten-1'],
        item: ['spread'] },
      templates: {
        empty: `<div class="hit spread mt-5 pinned-top is-full darken-1 rounded-1 c-sp-1 m-1"> <div class="white text-center rounded-1"><h2 class="uppercase bold">No Results Found</h2>
        <div class="subtitle-1"> Could not locate results matching <strong>{{query}}</strong>. </div> `,
        item: `<a class="hit spread c-pinned-center is-full darken-1 rounded-1 c-sp-1 m-1 move-l" href="{{relURI}}">
        <div class="black is-fit xxs rounded-1 darken-3">{{{version}}}</div>
                <div class="stack c-mt-1">
                 <b class="xxs uppercase is-fit">{{parent}}</b>
                  <h3 class="is-fit s extra-bold">{{{title}}}</h3>
                  <div class="xs">{{{description}}}</div>
                </div>
              </a>`
      },
      transformData: {
        item: function(hit) {
          hit.raw = JSON.stringify(hit, null, 2);
            return hit;
        }
      }
    })
  ]);
  
  search.start();
