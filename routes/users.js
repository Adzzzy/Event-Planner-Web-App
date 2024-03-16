var express = require('express');
var router = express.Router();
var path = require('path');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* router.get('/createevent', function(req, res, next) {

  res.sendFile(path.resolve('public/createevent.html'));

});

router.get('/myevents', function(req, res, next) {

  res.sendFile(path.resolve('public/myevents.html'));

});

router.get('/events', function(req, res, next) {

  res.sendFile(path.resolve('public/events.html'));

}); */

module.exports = router;