const request = require('superagent');
var github = require('octonode');
var axios = require('axios');

var useJWT = false;

module.exports = (app) => {
    app.get('/getAccessToken', (req, res, next) => {
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
                    var token = op.body.access_token;
                    res.send(token);
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
                        "id": gist.id,
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
                res.setHeader('Content-Type', 'application/json');
                var data = JSON.parse(result.text);
                var array = data.map(function (gist, index) {
                    return {
                        "id": gist.id,
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

            console.log("Requesting for starred gists");
            request
                .get('https://api.github.com/gists/starred?access_token=' + token)
                .then(function (result) {
                    res.setHeader('Content-Type', 'application/json');
                    var data = JSON.parse(result.text);
                    var array = data.map(function (gist, index) {
                        return {
                            "id": gist.id,
                            "createdOn": new Date(gist.created_at),
                            "description": gist.description,
                            "avatarUrl": gist.owner.avatar_url,
                            "user": gist.owner.login,
                            "userUrl": gist.html_url,
                            "starred": true,
                        };
                    });

                    res.send(array);
                }).catch(err => {
                    console.log(err);
                    res.status(404).send(err);
                });
        }
    });

    app.post('/gists/star/:gist_id', (req, res, next) => {
        console.log(req.params.gist_id);
        console.log(req.body);
        var token = req.body.headers['x-access-token'];
        if (!token)
            return res.status(401).send({
                auth: false,
                message: 'No token provided.'
            });
        else {

            axios
                .put(
                    "https://api.github.com/gists/" + req.params.gist_id + "/star?access_token" + token, {
                        headers: {
                            "Content-length": "0",
                        }
                    }
                )
                .then(r => console.log(r.status))
                .catch(e => {console.log(e);
                    res.status(404).send();}
                );


            //     var ghgist = github.client(token).gist();
            //     console.log("starring " + req.params.gist_id);
            //     ghgist.star(req.params.gist_id, error => {
            //         if (!error) {
            //             res.status(200).send();
            //         } else {
            //             res.status(404).send("https://gist.github.com/" + req.params.gist_id);
            //         }
            //     });
        }

    });

    app.post('/gists/unstar/:gist_id', (req, res, next) => {
        console.log(req.params.gist_id);

        var token = req.body.headers['x-access-token'];
        if (!token)
            return res.status(401).send({
                auth: false,
                message: 'No token provided.'
            });
        else {

            axios
                .delete(
                    "https://api.github.com/gists/" + req.params.gist_id + "/star?access_token" + token, {
                        headers: {
                            "Content-length": "0",
                        }
                    }
                )
                .then(r => console.log(r.status))
                .catch(e => {
                    console.log(e.message);
                    res.status(404).send();
                });


            //     var ghgist = github.client(token).gist();
            //     console.log("starring " + req.params.gist_id);
            //     ghgist.star(req.params.gist_id, error => {
            //         if (!error) {
            //             res.status(200).send();
            //         } else {
            //             res.status(404).send("https://gist.github.com/" + req.params.gist_id);
            //         }
            //     });
        }

    });

};