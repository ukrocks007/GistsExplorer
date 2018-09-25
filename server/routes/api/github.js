const request = require('superagent');
const config = require('../../../config/config');
var jwt = require('jsonwebtoken');
var github = require('octonode');

var useJWT = false;

module.exports = (app) => {
    app.get('/users/signin/callback', (req, res, next) => {
        const {
            query
        } = req;
        console.log(query);

        const {
            code
        } = query;

        if (!code) {
            return res.send({
                success: false,
                message: 'Error: no code'
            });
        } else {
            request
                .post('https://github.com/login/oauth/access_token')
                .send({
                    client_id: '778f41cf857e92c6934d',
                    client_secret: '0056a9779340afe06b17ca53b1f7463badef7fcd',
                    code: code
                })
                .set('Accept', 'application/json')
                .then(op => {
                    var token = useJWT ? jwt.sign({
                        token: op.body.access_token
                    }, "" + config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    }) : op.body.access_token;
                    res.cookie("token", token, {
                        secure: true,
                        maxAge: 120000,
                        httpOnly: true
                    });
                    res.send();
                });
        }
    });

    app.get('/gists/', (req, res, next) => {
        request
            .get('https://api.github.com/gists/public?client_id=778f41cf857e92c6934d&client_secret=0056a9779340afe06b17ca53b1f7463badef7fcd')
            .then(function (result) {
                console.log("Got Gists list");
                res.setHeader('Content-Type', 'application/json');
                var data = JSON.parse(result.text);
                var array = data.map(function (gist, index) {
                    return {
                        "key": gist.id,
                        "createdOn": new Date(gist.created_at),
                        "description": gist.description,
                        "avatarUrl": gist.owner.avatar_url,
                        "user": gist.owner.login,
                        "userUrl": gist.html_url,
                    };
                });

                res.send(array);
            });
    });

    app.get('/gists/:page/:per_page', (req, res, next) => {
        request
            .get('https://api.github.com/gists/public?client_id=778f41cf857e92c6934d&client_secret=0056a9779340afe06b17ca53b1f7463badef7fcd&page=' + req.params.page + '&per_page=' + req.params.per_page)
            .then(function (result) {
                console.log("Got Gists list");
                res.setHeader('Content-Type', 'application/json');
                var data = JSON.parse(result.text);
                var array = data.map(function (gist, index) {
                    return {
                        "key": gist.id,
                        "createdOn": new Date(gist.created_at),
                        "description": gist.description,
                        "avatarUrl": gist.owner.avatar_url,
                        "user": gist.owner.login,
                        "userUrl": gist.html_url,
                    };
                });

                res.send(array);
            });
    });

    app.get('/gists/favourite/', (req, res, next) => {
        console.log('Header: ' + req.headers['x-access-token']);

        var token = req.headers['x-access-token'];
        if (!token)
            return res.status(401).send({
                auth: false,
                message: 'No token provided.'
            });
        else {
            if (useJWT) {
                jwt.verify(token, config.secret, function (err, decoded) {
                    if (err) return res.status(500).send({
                        auth: false,
                        message: 'Failed to authenticate token.'
                    });
                    console.log(decoded);
                    request
                        .get('https://api.github.com/gists/starred?access_token=' + decoded.token)
                        .then(function (result) {
                            res.setHeader('Content-Type', 'application/json');
                            res.send(result);
                        });
                });
            } else {
                request
                    .get('https://api.github.com/gists/starred?access_token=' + token)
                    .then(function (result) {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(result);
                    });
            }
        }
    });

    app.post('/gists/star/:gist_id', (req, res, next) => {
        console.log(req.params.gist_id);

        var token = req.headers['x-access-token'];
        if (!token)
            return res.status(401).send({
                auth: false,
                message: 'No token provided.'
            });
        else {
            if (useJWT) {
                jwt.verify(token, config.secret, function (err, decoded) {
                    if (err) return res.status(500).send({
                        auth: false,
                        message: 'Failed to authenticate token.'
                    });
                    console.log(decoded);

                    var ghgist = github.client(decoded.token).gist();
                    console.log("starring " + req.params.gist_id);
                    ghgist.star(req.params.gist_id, error => {
                        if (!error) {
                            res.status(200).send();
                        } else {
                            res.status(404).send("https://gist.github.com/" + req.params.gist_id);
                        }
                    });
                });
            } else {
                var ghgist = github.client(token).gist();
                console.log("starring " + req.params.gist_id);
                ghgist.star(req.params.gist_id, error => {
                    if (!error) {
                        res.status(200).send();
                    } else {
                        res.status(404).send("https://gist.github.com/" + req.params.gist_id);
                    }
                });
            }
        }

    });

};