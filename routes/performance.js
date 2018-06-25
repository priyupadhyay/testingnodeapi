var express = require('express');
var router = express.Router();

/* GET performance listing. */
router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM performance', function (error, results, fields) {
        if (error) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        } else {
            //res.charset = 'utf8';
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            //If there is no error, all is good and response is 200OK.
        }
    });
});





router.get('/:uid', function (req, res, next) {
    connection.query('SELECT * FROM performance WHERE uid=' + req.params.uid, function (error, results, fields) {

        if (error) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        } else {
            //res.charset = 'utf8';
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

router.post('/', function (req, res) {
    var uid = req.body.uid;
    var testId = req.body.testid;
    var studentReponse = req.body.sturesponse;
    var total = req.body.total;
    var score = req.body.score;
    connection.query('INSERT INTO performance SET uid = ?, testid = ?, studentresponse = ?, score = ?, total=?, createdon=NOW()', [uid, testId, studentReponse, score, total], function (error, results, fields) {

        if (error) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        } else {

            //res.charset = 'utf8';
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.send(JSON.stringify({ "status": 200, "error": null, "response": { msg: "Record Inserted " + results.insertId } }));
            //If there is no error, all is good and response is 200OK.
        }
    });

});

module.exports = router;
