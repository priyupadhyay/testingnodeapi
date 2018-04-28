var express = require('express');
var router = express.Router();


/* GET questions listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * FROM questions WHERE `status`= 1 LIMIT 1000', function (error, results, fields) {
	  	if(error){
	  		res.setHeader('Content-Type', 'application/json');
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
	  		res.setHeader('Content-Type', 'application/json');
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});


router.get('/:qid', function(req, res, next) {
	var sql = '';
	if(req.params.qid === 'all'){
		/* GET all questions listing. */
		sql = 'SELECT * FROM questions WHERE `status`= 1';
		}	
		/* GET question by id listing. */
		else sql = 'SELECT * FROM questions WHERE id = '+req.params.qid;

	connection.query( sql, function (error, results, fields) {
	  	if(error){
	  		res.setHeader('Content-Type', 'application/json');
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
	  		res.setHeader('Content-Type', 'application/json');
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

module.exports = router;
