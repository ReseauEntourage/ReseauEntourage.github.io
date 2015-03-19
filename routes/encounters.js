var express = require('express');
var router = express.Router();

var http = require('http');
var options = {
  host: 'entourage-back.herokuapp.com',
  path: '/map.json?token=0cb4507e970462ca0b11320131e96610&limit=1000&distance=1&latitude=48.8464021&longitude=2.332417'
};
var encounterList="";

var initEncounters = function(list) {
	var encounterList = new Array();
	list.forEach(function(e){
		if(e.voice_message==null) { 
			return;
		} 
		if(e.voice_message.search("api.soundcloud")!=-1) {
			e.voice_message = e.voice_message.replace("/stream","")+ "?client_id=8ea64716590a242e6f205bf1f821bb4a";
			console.log(e.id+"=="+e.voice_message);
			encounterList[encounterList.length] = e;
		} else if(e.voice_message.search("soundcloud")!=-1) {
			console.log(e.id+"=="+e.voice_message);
			encounterList[encounterList.length] = e;
		} else {
			e.voice_message=null;
		}
	})
	/* GET encounters page.*/
	router.get('/', function(req, res) {
	    res.render('encounters', { title: 'Rencontres du réseau Entourage', encounters : JSON.stringify(encounterList) })
	});

	router.get('/:id([0-9]+)', function(req, res) {
	    res.render('encounters', { title: 'Ma Rencontre sur Entourage', encounters : JSON.stringify(encounterList) , encounter: req.params.id })
	});
};

var req = http.get(options, function(res) {
  // Buffer the body entirely for processing as a whole.
  var bodyChunks = [];
  res.on('data', function(chunk) {
    // You can process streamed parts here...
    bodyChunks.push(chunk);
  }).on('end', function() {
    var body = Buffer.concat(bodyChunks);
    encounterList = JSON.parse(body).encounters;
    initEncounters(encounterList);
  })
});

req.on('error', function(e) {
  console.log('ERROR: ' + e.message);
});

module.exports = router;