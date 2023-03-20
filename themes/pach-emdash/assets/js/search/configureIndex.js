import algoliasearch from 'algoliasearch'

export const client = algoliasearch(
  'RUV2F528SR',
  'fce88031ca90abb0eddd7e3a11bb5855'
);

export const index = client.initIndex('demo_media');

index.setSettings({
  // Select the attributes you want to search in
  searchableAttributes: [
    'title', 'version', 'tags', 'body', 'description'
  ],
  // Define business metrics for ranking and sorting
  customRanking: [
    // 'desc(post_date)', 'desc(record_index)'
  ],
  // Set up some attributes to filter results on
  attributesForFaceting: [
    'tags'
  ],
  // Define the attribute we want to distinct on
  attributeForDistinct: 'parent',
  distinct: 3,
  hitsPerPage: 5,
})
