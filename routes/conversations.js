var express = require('express');
var router = express.Router();


/* GET groups listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * FROM conversations WHERE status>=0', function (error, results, fields) {
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



router.get('/:uid', function(req, res, next) {
	connection.query('SELECT * FROM `conversations` WHERE (`to` = '+req.params.uid+' AND `status` = 1 OR `status` =3) OR (`from` = '+req.params.uid+' AND `status` = 2 OR `status` =3)', function (error, results, fields) {
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
    var to = req.body.to;
    var from = req.body.from;  
  	var message = req.body.message;
	connection.query('INSERT INTO conversations SET to = ?, from = ?, message = ?, date = NOW()',[to,from,message], function (error, results, fields) {

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
  
  
router.delete('/:id',function(req,res){
    connection.query('UPDATE conversations SET status=0 WHERE id ='+req.params.id, function (error, results, fields) {});
    res.end("Record Deleted");
}); 
    
router.delete('/:id/sent',function(req,res){
    connection.query('UPDATE conversations SET status=2 WHERE id ='+req.params.id, function (error, results, fields) {});
    res.end("Record Deleted");
});
  
router.delete('/:id/received',function(req,res){
    connection.query('UPDATE conversations SET status=1 WHERE id ='+req.params.id, function (error, results, fields) {});
    res.end("Record Deleted");
});

module.exports = router;
