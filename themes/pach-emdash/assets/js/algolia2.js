const searchClient = algoliasearch('RUV2F528SR', '1f21e218181a4f87c5496cd574a88c70');
const indexName = 'INDEX_NAME';

const search = instantsearch({
  indexName,
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.configure({
    hitsPerPage: 5,
    attributesToSnippet: ['description'],
  }),

  instantsearch.widgets.autocomplete({
    container: '#autocomplete',
    placeholder: 'Search for a product',
    openOnFocus: true,
    templates: {
      dropdownMenu:
        '<div class="dropdown-menu" style="width: 100%;">{{#categories}}' +
        '<div class="category">' +
        '<div class="title">{{name}}</div>' +
        '<div class="products">{{#items}}<div class="product">{{name}}</div>{{/items}}</div>' +
        '</div>' +
        '{{/categories}}</div>',
      item: '{{name}}',
      footer: '<div class="footer">Powered by Algolia</div>',
    },
    transformData: function (hits) {
      const categories = hits.reduce((acc, hit) => {
        const category = hit.category;
        const product = { name: hit.name };
        const categoryIndex = acc.findIndex((c) => c.name === category);

        if (categoryIndex !== -1) {
          acc[categoryIndex].items.push(product);
        } else {
          acc.push({
            name: category,
            items: [product],
          });
        }

        return acc;
      }, []);

      return {
        categories,
      };
    },
    // Custom CSS classes for the widget
    cssClasses: {
      dropdownMenu: 'dropdown-menu',
      item: 'product',
      footer: 'footer',
    },
  }),
]);

search.start();
