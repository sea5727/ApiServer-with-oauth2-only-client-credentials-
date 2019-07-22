
var OAuth2Server = require('express-oauth-server');
var Request = require('oauth2-server').Request;
var Response = require('oauth2-server').Response;
// var service = require('./service');
var model = require('./model');

var oauth2 = new OAuth2Server({
    model : model,
    // useErrorHandler : true,
});

var error = () => {
  return function(err, req, res, next) {
    // console.log(err);
    if(err.name === 'unauthorized_request'){ 
      var response = new Response(res);
      response.redirect('http://127.0.0.1:3001/auth/token')
      res.set(response.headers)
      res.status(response.status)
      res.redirect(response.headers.location);
    }
    else {
      res.send(err);
    }
  }
};

exports.authenticate = oauth2.authenticate();
// exports.error = error();
exports.token = oauth2.token();
