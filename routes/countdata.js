var express = require('express');
var router = express.Router();


/* GET chapters listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT (SELECT COUNT(*) FROM questions WHERE `status`= 1)  as question_count, (SELECT COUNT(*) FROM chapters) as chapter_count,	(SELECT COUNT(*) FROM subjects) as subject_count, (SELECT COUNT(*) FROM topics) as topic_count,	(SELECT COUNT(*) FROM quest_list) as questionpaper_count, (SELECT COUNT(*) FROM user) as user_count', function (error, results, fields) {
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