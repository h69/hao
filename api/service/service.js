const dao = require('../dao/dao');

function submit(data, callback) {
  dao.insert(data, function (msg) {
    callback(msg);
  });
}

function getData(callback) {
  dao.query(function (rows) {
    let data = [];

    for (let i = 0; i < rows.length; i++) {
      data.push({
        tag: rows[i].f_tag,
        title: rows[i].f_title,
        href: rows[i].f_href
      });
    }

    callback(JSON.stringify(data));
  });
}

module.exports = {
  submit: submit,
  getData : getData,
};