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
	// connection.query('SELECT * FROM `conversations_history` WHERE (`user1` = '+req.params.uid+' OR `user2` = '+req.params.uid+')', function (error, results, fields) {
		//SELECT convo.id , convo.user1, users1.name as user1name, convo.user2, users2.name as user2name,convo.sender,convo.message FROM conversations_history convo , users users1, users users2  WHERE (convo.user1 = '+req.params.uid+' OR convo.user2 = '+req.params.uid+') AND users1.user_id = convo.user1 AND users2.user_id = convo.user2
connection.query('SELECT convo.id , convo.user1, users1.name as user1name, convo.user2, users2.name as user2name,convo.sender,convo.message FROM conversations_history convo , users users1, users users2  WHERE (convo.user1 = '+req.params.uid+' OR convo.user2 = '+req.params.uid+') AND users1.user_id = convo.user1 AND users2.user_id = convo.user2', function (error, results, fields) {
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


router.get('/my/:aid/:bid', function(req, res, next) {
	connection.query('SELECT * FROM `conversations` WHERE (`to` = '+req.params.aid+' AND `from` = '+req.params.bid+'`status` = 1 OR `status` =3) OR (`to` ='+req.params.bid+'`from` = '+req.params.aid+' AND `status` = 2 OR `status` =3)', function (error, results, fields) {
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
	
	  
	  connection.query('SELECT COUNT(*) as convo_count FROM conversations_history WHERE (user1 =? AND user2 = ?) OR (user1 =? AND user2 = ?) ',[to,from,from,to], function (error, results, fields) {

		if(error){
	  		res.setHeader('Content-Type', 'application/json');
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
			  var count = results[0].convo_count;
			  if(count<1){
				  //insert and insert
				  connection.query('INSERT INTO conversations SET `to` = ?, `from` = ?, message = ?, date = NOW()',[to,from,message], function (error, results, fields) {

					if(error){
						  res.setHeader('Content-Type', 'application/json');
						  res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
						  //If there is error, we send the error in the error section with 500 status
					  } else {
						  
						connection.query('INSERT INTO conversations_history SET `user1` = ?, `user2` = ?, message = ?, sender = ?',[to,from,message,from], function (error, results, fields) {
			
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
					  }
				});
			  }
			  else{
				  //insert and update
				  connection.query('INSERT INTO conversations SET `to` = ?, `from` = ?, message = ?, date = NOW()',[to,from,message], function (error, results, fields) {

					if(error){
						  res.setHeader('Content-Type', 'application/json');
						  res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
						  //If there is error, we send the error in the error section with 500 status
					  } else {
						  
						connection.query('UPDATE conversations_history SET `user1` = ?, `user2` = ?, message = ?, sender = ? WHERE (user1 =? AND user2 = ?) OR (user1 =? AND user2 = ?)',[to,from,message,from,to,from,from,to], function (error, results, fields) {
			
							if(error){
								  res.setHeader('Content-Type', 'application/json');
								  res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
								  //If there is error, we send the error in the error section with 500 status
							  } else {
								  
								  //res.charset = 'utf8';
								  res.setHeader('Content-Type', 'application/json; charset=utf-8');
								  res.send(JSON.stringify({"status": 200, "error": null, "response": {msg: "Record Updated "+results.insertId}}));
								  //If there is no error, all is good and response is 200OK.
							  }
						});
					  }
				});
			  }
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
