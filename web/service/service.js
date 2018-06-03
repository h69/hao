const fs = require('fs');

function write(data) {
  let object = {};
  for (let i = 0; i < data.length; i++) {
    let group = data[i].group;

    if (!object[group]) {
      object[group] = [];
    }

    object[group].push({ 
      group: data[i].group,
      title: data[i].title,
      href: data[i].href,
      content: data[i].content
    });
  }

  let items = [];
  for (let key in object) {
    for (let i = 0; i < object[key].length; i++) {
      items.push({ 
        group: object[key][i].group,
        title: object[key][i].title,
        href: object[key][i].href,
        content: object[key][i].content
      });
    }
  }

  fs.writeFileSync('./data/data.json', JSON.stringify(items));
}

function read() {
  return fs.readFileSync('./data/data.json');
}

function get() {
  let array = JSON.parse(read());
  
  let object = {};
  for (let i = 0; i < array.length; i++) {
    let group = array[i].group;

    if (!object[group]) {
      object[group] = [];
    }

    object[group].push({ 
      title: array[i].title,
      href: array[i].href,
      content: array[i].content
    });
  }

  let items = [];
  for (let key in object) {
    items.push({
      group: key,
      items: object[key]
    });
  }

  return JSON.stringify(items);
}

module.exports = {
  write: write,
  read : read,
  get: get
};