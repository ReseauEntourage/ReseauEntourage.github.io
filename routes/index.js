var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET encounters page. */
router.get('/encounters', function(req, res) {
    res.render('encounters', { title: 'Rencontres du réseau Entourage' })
});

router.get('/encounters/:id([0-9]+)', function(req, res) {
    res.render('encounters', { title: 'Ma Rencontre sur Entourage', encounter: req.params.id })
});

module.exports = router;
