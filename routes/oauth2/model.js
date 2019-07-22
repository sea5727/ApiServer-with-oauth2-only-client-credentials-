var db = require('../../db');
var jwt = require('jsonwebtoken');
var jwkToPem = require('jwk-to-pem');
var request = require('request');//.defaults({maxRedirects:20});
var Promise = require('bluebird');




module.exports = {
    getAccessToken : (accessToken, callback) => {
        console.log('getAccessToken');

        Promise.resolve()
        .then(()=> {
            return new Promise((resolve, reject) => {
                var headers = {};
                headers['content-type'] = 'application/x-www-form-urlencoded';
                
                var options2 = {
                    url: 'http://127.0.0.1:3001/auth/jwks',
                    method: 'GET',
                    headers: headers,
                };
                request(options2, function (error, response, body) {
                    console.log('error:', error); // Print the error if one occurred
                    console.log('statusCode:', response && response.statusCode); // Print the response status code if \a response was received
                    console.log('body:', body); // Print the HTML for the Google homepage
        
                    return resolve([ accessToken, body] );
                });
            })

        })
        .then((jwt_and_jwks)=>{
            return new Promise((resolve, reject) => {
                var rsp_jwt = jwt_and_jwks[0]
                var rsp_jwks = jwt_and_jwks[1]
                var objJwks = JSON.parse(rsp_jwks)
                pem = jwkToPem(objJwks);
                return resolve([ rsp_jwt, pem] );
            })

        })
        .then((jwt_and_publickey) => {
            return new Promise((resolve, reject) => {
                var accessToken = jwt_and_publickey[0]
                var publickey = jwt_and_publickey[1]
                jwt.verify(accessToken, publickey,   { issuer : '192.168.0.61:3001' }, (err, decoded) => {
                    if(err) return reject(err);
                    console.log('err ' , err);
                    console.log('decoded', decoded);
                    // callback(null, decoded.payload.accessToken);
                    var AccessToken = {
                        accessToken : decoded.accessToken,
                        accessTokenExpiresAt : new Date(decoded.exp), 
                        user : {},
                    }
                    return resolve(AccessToken);

                })
            })
        })
        .catch((err) => {
            console.log('catch..' , err);
        })
        .then((AccessToken) => {
            console.log('fin');
            callback(null, AccessToken);
        })

    },
    verifyScope : (accessToken, scope, callback) => {
        console.log('verifyScope');
        callback(null);
    }
  }