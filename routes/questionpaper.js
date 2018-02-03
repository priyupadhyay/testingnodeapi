var express = require('express');
var router = express.Router();


/* GET chapters listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * FROM quest_list', function (error, results, fields) {
	  	if(error){
	  		res.setHeader('Content-Type', 'application/json');
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
	  		//res.charset = 'utf8';
	  		res.setHeader('Content-Type', 'application/json; charset=utf-8');
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});


router.get('/:id', function(req, res, next) {
	connection.query('SELECT * FROM quest_paper WHERE qpid='+req.params.id, function (error, results, fields) {
	  	if(error){
	  		res.setHeader('Content-Type', 'application/json');
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
	  		//res.charset = 'utf8';
	  		res.setHeader('Content-Type', 'application/json; charset=utf-8');
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});
router.get('/subject/:subName', function(req, res, next) {
	connection.query('SELECT * FROM quest_paper WHERE qsubject="'+req.params.subName+'"', function (error, results, fields) {
	  	if(error){
	  		res.setHeader('Content-Type', 'application/json');
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
	  		//res.charset = 'utf8';
	  		res.setHeader('Content-Type', 'application/json; charset=utf-8');
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});
module.exports = router;
