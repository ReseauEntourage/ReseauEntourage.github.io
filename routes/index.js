var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Réseau Entourage' });
});

/* GET home page. */
router.get('/contact', function(req, res) {
  res.render('contact', { title: 'Réseau Entourage' });
});

module.exports = router;
