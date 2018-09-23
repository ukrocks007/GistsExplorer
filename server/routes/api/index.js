const request = require('superagent');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

module.exports = (app) => {
    app.get('/user',ensureAuthenticated, (req, res) => {
        
    });

    function ensureAuthenticated(req, res, next){
        if(req.headers['x-access-token']){
            request.get('https://api.github.com/user')
            .set('Authorization', 'token'+ req.headers['x-access-token'])
            .then(function(result){
                console.log(result);
            });
            
        } else {
            
        }
    }
};