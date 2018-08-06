var express = require('express');
var router = express.Router();


/* GET tests listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT T.*, u.name as groupname FROM tests as T, users as U WHERE status=1 INNER JOIN users u1 ON (T.group_id = U.user_id)SELECT T.*, G.name as groupname FROM tests as T INNER JOIN groups as G ON(T.group_id = G.id) WHERE  T.status = 1', function (error, results, fields) {
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
	connection.query('SELECT * FROM tests WHERE status=1 AND end_date >=  NOW()', function (error, results, fields) {
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
	connection.query('SELECT * FROM tests WHERE status=1 AND end_date <  NOW()', function (error, results, fields) {
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
	connection.query('SELECT * FROM test_details, tests  WHERE tests.test_id = ? AND tests.status=1 AND test_details.id = (SELECT test_file_id FROM tests WHERE status=1 AND test_id = ?)', [req.params.testId, req.params.testId], function (error, results, fields) {
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
	connection.query('SELECT * FROM tests LEFT JOIN user_tests ON user_tests.test_id = tests.test_id WHERE user_tests.status=1 AND tests.end_date < NOW() AND user_tests.user_id = ?',[req.params.studentId], function (error, results, fields) {
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

router.get('/upcoming/:studentId', function(req, res, next) {
	connection.query('SELECT * FROM tests WHERE status=1 AND end_date > NOW() AND test_id IN (SELECT test_id from user_tests WHERE status=1 AND user_id = ?)',[req.params.studentId], function (error, results, fields) {
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

router.get('/upcoming/:studentId', function(req, res, next) {
	connection.query('SELECT * FROM user_tests WHERE user_tests.status=1 AND user_tests.end_date > NOW() AND user_tests.user_id='+req.params.studentId, function (error, results, fields) {
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
var title=req.body.title;
var desc=req.body.description;
var tfi=req.body.test_file_id;
var sch_date=req.body.scheduled_date;
var end_date=req.body.end_date;
var group_id=req.body.group_id;
connection.query('INSERT INTO tests SET title = ?, description = ?, test_file_id = ?, scheduled_date = ?,end_date = ?,group_id = ?',[title,desc,tfi,sch_date,end_date,group_id], function (error, results, fields) {

		if(error){
	  		res.setHeader('Content-Type', 'application/json');
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
			  
	  		//res.charset = 'utf8';
	  		res.setHeader('Content-Type', 'application/json; charset=utf-8');
  			res.send(JSON.stringify({"status": 200, "error": null, "response": {msg: "Record Inserted "+results.insertId}}));
  			//If there is no error, all is good and response is 200OK.
	  	}
	});
});

router.put('/:testId',function(req,res){
var title=req.body.title;
var desc=req.body.description;
var tfi=req.body.test_file_id;
var sch_date=req.body.scheduled_date;
var end_date=req.body.end_date;
var group_id=req.body.group_id;
connection.query('UPDATE tests SET title = ?, description = ?, test_file_id = ?, scheduled_date = ?,end_date = ?,group_id = ? WHERE test_id = ?',[title,desc,tfi,sch_date,end_date,group_id,req.params.testId], function (error, results, fields){
		if(error){
	  		res.setHeader('Content-Type', 'application/json');
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
			  
	  		//res.charset = 'utf8';
	  		res.setHeader('Content-Type', 'application/json; charset=utf-8');
  			res.send(JSON.stringify({"status": 200, "error": null, "response": {msg: "Record Inserted "+results.insertId}}));
  			//If there is no error, all is good and response is 200OK.
	  	}
	});
  });

router.delete('/:testId',function(req,res){
	connection.query('UPDATE tests SET status=0 WHERE test_id ='+req.params.testId, function (error, results, fields) {});
	res.end("Record Deleted");
	});
module.exports = router;