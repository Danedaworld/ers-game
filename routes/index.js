var express = require('express');
var router = express.Router();


router.get('/m', function(req, res, next) {
    res.render('m_index', { title: 'Express' });
});
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
}); 


module.exports = router;
