import algoliasearch from 'algoliasearch'

const client = algoliasearch('RUV2F528SR', 'fce88031ca90abb0eddd7e3a11bb5855')

const index = client.initIndex('demo_media')

fetch('https://docs.pachyderm.com/latest/index.json')
  .then(function(response) {
    return response.json()
  })
  .then(function(posts) {
    return index.saveObjects(posts, {
      autoGenerateObjectIDIfNotExist: true
    })
  })