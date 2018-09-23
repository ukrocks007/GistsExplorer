const request = require('superagent');
const config = require('../../../config/config');
var jwt = require('jsonwebtoken');

module.exports = (app) => {
    app.get('/users/signin/callback', (req, res, next) => {
        const { query } = req;
        console.log(query);

        const { code } = query;

        if (!code) {
            return res.send({
                success: false,
                message: 'Error: no code'
            });
        }
        else {
            request
                .post('https://github.com/login/oauth/access_token')
                .send({ 
                    client_id: '778f41cf857e92c6934d', 
                    client_secret: '0056a9779340afe06b17ca53b1f7463badef7fcd', 
                    code: code 
                })
                .set('Accept', 'application/json')
                .then(op => {
                    var token = jwt.sign({ token: op.body.access_token }, "" + config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    res.redirect('/?token='+token);
                });
        }
    });

    app.get('/gists/', (req, res, next) => {
        
    });
};