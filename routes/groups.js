var express = require('express');
var router = express.Router();


/* GET groups listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * FROM groups', function (error, results, fields) {
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
	connection.query('SELECT * FROM groups WHERE type='+req.params.id, function (error, results, fields) {
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


router.get('/:id/users', function(req, res, next) {
	connection.query('SELECT * FROM groups t1, group_users t2, users t3 USING t1,t2,t3 WHERE t1.id =  t2.id AND t1.id = t3.id id='+req.params.id, function (error, results, fields) {
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
	connection.query('INSERT INTO groups VALUES (?)',id, function (error, results, fields) {});
	res.end("yes");
  });
  
  
  router.put('/:id',function(req,res){
	  //var id=req.params.id;
	  //var name=req.body.name;
	  connection.query('UPDATE groups SET name =? WHERE id = ? ',name,id, function (error, results, fields) {});
	  res.end("yes");
	});
  
  
  router.delete('/:id',function(req,res){
	  connection.query('DELETE FROM groups t1, group_users t2 USING t1, t2 WHERE t1.id =  t2.id AND t1.id ='+req.params.id, function (error, results, fields) {});
	  res.end("Record Deleted");
	});
  

module.exports = router;
