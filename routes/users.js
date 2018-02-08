var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * FROM users', function (error, results, fields) {
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



router.get('/type/:type', function(req, res, next) {
	connection.query('SELECT * FROM users WHERE type='+req.params.type, function (error, results, fields) {
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


router.get('/type/:id', function(req, res, next) {
	connection.query('SELECT * FROM users WHERE id='+req.params.id, function (error, results, fields) {
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
	//var id=req.body.id;
	//var name=req.body.name;
	connection.query('INSERT INTO users VALUES (?)',id, function (error, results, fields) {});
	res.end("yes");
  });
  
  
  router.put('/:testId',function(req,res){
	  //var id=req.params.id;
	  //var name=req.body.name;
	  connection.query('UPDATE users SET name =? WHERE id = ? ',name,id, function (error, results, fields) {});
	  res.end("yes");
	});
  
  
  router.delete('/:id',function(req,res){
	  connection.query('DELETE FROM users t1, group_users t2, user_tests t3 USING t1, t2, t3 WHERE t1.id =  t2.id AND t1.id = t3.id AND t1.id ='+req.params.id, function (error, results, fields) {});
	  res.end("Record Deleted");
	});
  

module.exports = router;
