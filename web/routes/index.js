const express = require('express');
const service = require('../service/service');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendfile('./views/index.html');
});

router.post('/api/write', (req, res, next) => {
  if (req.body.token == 'admin') {
    service.write(req.body.items);
    res.end('success');
  } else {
    res.end('forbidden')
  }
});

router.post('/api/read', (req, res, next) => {
  if (req.body.token == 'admin') {
    res.end(service.read());
  } else {
    res.end('forbidden')
  }
});

router.post('/api/get', (req, res, next) => {
  res.end(service.get());
});

module.exports = router;
