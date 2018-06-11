var express = require('express');
var router = express.Router();
var request = require('request-promise-native');

var githubProfile = function (req, res, next) {
  const options = {
    uri: 'https://api.github.com/users/section11',
    headers:{
      'User-Agent': 'Request-Promise'
    }
  };
  request(options).then(function(data){
    req.profile = JSON.parse(data);
    next();
  });
}

router.use(githubProfile);

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req);
  res.render('index', { title: 'Github Profile', profile : req.profile });
});

module.exports = router;
