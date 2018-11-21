const dao = require('../dao/dao');

function submit(data, callback) {
  dao.insert(data, function (msg) {
    callback(msg);
  });
}

function getAdminData(callback) {
  dao.query(function (rows) {
    let data = [];

    for (let i = 0; i < rows.length; i++) {
      data.push({
        label: rows[i].f_label,
        name: rows[i].f_name,
        href: rows[i].f_href
      });
    }

    callback(JSON.stringify(data));
  });
}

function getIndexData(callback) {
  dao.query(function (rows) {
    let data = [];

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].f_label && rows[i].f_name && rows[i].f_href) {
        let flag = true;
        
        for (let j = 0; j < data.length; j++) {
          if (data[j].label === rows[i].f_label) {
            data[j].data.push({
              name: rows[i].f_name,
              href: rows[i].f_href
            });
            flag = false;
            break;
          } 
        }

        if (flag) {
          data.push({
            label: rows[i].f_label,
            data: [{
              name: rows[i].f_name,
              href: rows[i].f_href
            }]
          });
        }
      }
    }

    callback(JSON.stringify(data));
  });
}

module.exports = {
  submit: submit,
  getAdminData : getAdminData,
  getIndexData: getIndexData
};