var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect("https://www.facebook.com/EntourageReseauCivique");
  //res.render('index', { title: 'Réseau Entourage' });
});

module.exports = router;
