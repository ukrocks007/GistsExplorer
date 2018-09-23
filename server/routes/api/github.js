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
                    res.redirect('/?token=' + token);
                });
        }
    });

    app.get('/gists/', (req, res, next) => {
        request
            .get('https://api.github.com/gists/public')
            .then(function (result) {
                res.setHeader('Content-Type', 'application/json');
                res.send(result);
            });
    });

    app.get('/gists/favourite/', (req, res, next) => {
        console.log('Header: ' + req.headers['x-access-token']);

        var token = req.headers['x-access-token'];
        if (!token)
            return res.status(401).send({ auth: false, message: 'No token provided.' });
        else {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                console.log(decoded);
                request
                    .get('https://api.github.com/gists/starred?access_token=' + decoded.token)
                    .then(function (result) {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(result);
                    });
            });
        }
    });

    app.post('/gists/star/:gist_id/', (req, res, next) => {
        console.log(req.params.gist_id);

        var token = req.headers['x-access-token'];
        if (!token)
            return res.status(401).send({ auth: false, message: 'No token provided.' });
        else {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                console.log(decoded);

                //PUT /gists/:gist_id/star
                request
                    .post('https://api.github.com/gists/'+req.params.gist_id+'/star/?access_token=' + decoded.token)
                    .set('Content-Length', '0')
                    .then(function (result) {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(result);
                    });
            });
        }

    });

};