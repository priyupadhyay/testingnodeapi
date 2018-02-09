var express = require('express');
var router = express.Router();

//router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: false }));


/* GET users listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * FROM users WHERE status=1', function (error, results, fields) {
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
	connection.query('SELECT * FROM users WHERE status=1 AND type='+req.params.type, function (error, results, fields) {
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
	connection.query('SELECT * FROM users WHERE status=1 AND user_id='+req.params.id, function (error, results, fields) {

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
	var name=req.body.name;
	var uname=req.body.uname;
	var email=req.body.email;
	var type=req.body.type;
	connection.query('INSERT INTO users SET name = ?, uname = ?, email = ?, type = ?',[name,uname,email,type], function (error, results, fields) {

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
  
  router.put('/:id',function(req,res){
	var id=req.params.id;
	var name=req.body.name;
	var uname=req.body.uname;
	var email=req.body.email;
	var type=req.body.type;
	  connection.query("UPDATE users SET name = ?, uname = ?, email = ?, type = ? WHERE user_id = ? ",[name,uname,email,type,id], function (error, results, fields) {
		if(error){
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
		//If there is error, we send the error in the error section with 500 status
	} else {
		//res.charset = 'utf8';
		res.setHeader('Content-Type', 'application/json; charset=utf-8');
		res.send(JSON.stringify({"status": 200, "error": null, "response": {msg: "Record Updated"}}));
		//If there is no error, all is good and response is 200OK.
	}
	});
	});
  
  
  router.delete('/:id',function(req,res){
	  connection.query('UPDATE users WHERE user_id ='+req.params.id, function (error, results, fields) {});
	  connection.query('UPDATE user_tests WHERE user_id ='+req.params.id, function (error, results, fields) {});
	  connection.query('UPDATE group_users t2 WHERE user_id ='+req.params.id, function (error, results, fields) {});
	  res.end("Record Deleted");
	});
  

module.exports = router;
