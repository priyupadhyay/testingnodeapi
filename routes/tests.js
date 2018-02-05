var express = require('express');
var router = express.Router();


/* GET tests listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * FROM tests', function (error, results, fields) {
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


router.get('/time/upcoming', function(req, res, next) {
	connection.query('SELECT * FROM tests WHERE scheduled_time >=  NOW()', function (error, results, fields) {
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


router.get('/time/past', function(req, res, next) {
	connection.query('SELECT * FROM tests WHERE scheduled_time <  NOW()', function (error, results, fields) {
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

router.get('/:testId', function(req, res, next) {
	connection.query('SELECT * FROM test_details WHERE id='+req.params.testId, function (error, results, fields) {
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


router.get('/history/:studentId', function(req, res, next) {
	connection.query('SELECT * FROM tests,user_tests WHERE tests.scheduled_time < NOW() AND tests.testId=user_tests.testId AND uesr_tests.studentId='+req.params.studentId, function (error, results, fields) {
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

router.post('/',function(req,res){
  //var testId=req.body.testId;
  //var scheduled_time=req.body.scheduled_time;
  connection.query('INSERT INTO tests VALUES (?)',testId, function (error, results, fields) {});
  res.end("yes");
});


router.put('/:testId',function(req,res){
	//var testId=req.params.testId;
	//var scheduled_time=req.body.scheduled_time;
	connection.query('UPDATE tests SET scheduled_time =? WHERE testId = ? ',scheduled_time,testId, function (error, results, fields) {});
	res.end("yes");
  });


router.delete('/:testId',function(req,res){
	//var testId=req.params.testId;
	//var scheduled_time=req.body.scheduled_time;
	connection.query('DELETE FROM tests,testdetails WHERE testId = ? ',testId, function (error, results, fields) {});
	res.end("Record Deleted");
  });
module.exports = router;