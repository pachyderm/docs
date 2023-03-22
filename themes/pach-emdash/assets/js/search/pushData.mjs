import algoliasearch from 'algoliasearch'

const client = algoliasearch('RUV2F528SR', '1f21e218181a4f87c5496cd574a88c70')

const index = client.initIndex('staging]')

fetch('http://localhost:1313/staging/index.json')
  .then(function(response) {
    return response.json()
  })
  .then(function(posts) {
    return index.saveObjects(posts, {
      autoGenerateObjectIDIfNotExist: true
    })
  })