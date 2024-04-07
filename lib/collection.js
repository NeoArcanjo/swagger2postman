const fetch = require('./fetch');

function updateCollection(uid, data, spinner) {
  fetch({
    url: '/collections/' + uid,
    method: 'PUT',
    data,
  })
    .then(() => {
      spinner.succeed('update', { text: 'Update collection success' });
    })
    .catch((err) => {
      spinner.fail('update', { text: 'Update collection failed' });
    });
}

function getCollectionId(name) {
  return fetch({
    url: '/collections',
    method: 'get',
  })
    .then((response) => {
      let collection = response.data.collections.find(
        (ele) => ele.name === name
      );
      if (collection == null) {
        console.error('no collection with name: ' + name);
        process.exit(-1);
      }
      console.log('collection uid is:' + collection.uid);
      return collection.uid;
    })
    .catch((err) => {
      console.error('get collection error: ' + err);
      process.exit(-1);
    });
}

function getCollectionDetail(uid) {
  return fetch({
    url: '/collections/' + uid,
    method: 'get',
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error('get collection detail failed: ' + err);
      process.exit(-1);
    });
}

module.exports = {
  updateCollection,
  getCollectionId,
  getCollectionDetail,
};