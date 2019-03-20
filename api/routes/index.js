const express = require('express');
const service = require('../service/service');

const router = express.Router();

const password = 'admin';

router.get('/', function (req, res, next) {
  res.sendfile('./views/index.html');
});

router.post('/api/submit', (req, res, next) => {
  if (req.body.p === password) {
    service.submit(req.body.data, function (msg) {
      res.end(msg);
    });
    
  } else {
    res.end('forbidden')
  }
});

router.post('/api/getData', (req, res, next) => {
  service.getData(function (data) {
    res.end(data);
  })
});

module.exports = router;
