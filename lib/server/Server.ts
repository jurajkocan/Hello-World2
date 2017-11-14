import * as Express from 'express';
import * as Session from 'express-session';
import * as BodyParser from 'body-parser';
import { endpointsV1 } from '../api/Endpoints';
import { webConfig } from '../WebConfig';
import { renderHtml } from '../frontend/RenderHtml';
import axios from 'axios';

import { Schema } from '../database/Schema';

import { renderLogin } from '../frontend/pages/LoginServer';
import { renderRegister } from '../frontend/pages/RegisterServer';
import { renderApp } from '../frontend/pages/AppServer';

import { registerUser } from './user/User';
import { responses } from './response/ResponseTypes';

export const startServer = async (db: Schema) => {
    const app = Express();

    //webpack
    var webpack = require('webpack');
    var webpackConfig = require('../../webpack.config');
    var compiler = webpack(webpackConfig);

    // Step 2: Attach the dev middleware to the compiler & the server
    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath
    }));

    // Step 3: Attach the hot middleware to the compiler & the server
    app.use(require("webpack-hot-middleware")(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
    }));

    app.use(BodyParser.urlencoded({ extended: false }));
    app.use(BodyParser.json());
    app.use(Session(
        {
            secret: webConfig.SessionConfiguration.SessionSecret,
            cookie: { maxAge: webConfig.SessionConfiguration.ExpireLoginSession },
            saveUninitialized: true,
            resave: true,
        }
    ));
    app.use(Express.static('./public'));

    /**
     * api endpoints
     */
    endpointsV1.forEach((endPoint, index) => {
        switch (endPoint.type) {
            case 'GET':
                app.get(endPoint.endpointUrl, endPoint.endpointFunction);
                break;
            case 'POST':
                app.post(endPoint.endpointUrl, endPoint.endpointFunction);
                break;
        }
    });

    /**
     * github authentiations
     */
    app.get('/instalation', async (req, res) => {
        console.log(req.query);
        const response = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: 'some id',
            client_secret: 'some secret',
            code: req.query.code,
        })
        console.log(response.data);
        res.send('123');
    });

    app.get('/auth', async (req, res) => {
        res.redirect('https://github.com/login/oauth/authorize?client_id=a4f4fbcec0020ac2d628&redirect_uri=http://localhost:3000/instalation&scope=repo');
    });

    /**
     * local app
     */
    app.get('/app', async (req, res) => {
        const html = renderApp()
        res.send(html);
    });

    /**
     * local security pages
     */

    /**
     * @returns return registration page
     */
    app.get('/security/registration', async (req, res) => {
        const html = renderRegister()
        res.send(html);
    });

    /**
     * @returns login page
     */
    app.get('/security/login', async (req, res) => {
        let email = ''
        if (req.query && req.query.email)
            email = req.query.email;
        const html = renderLogin({ statusCode: 'registrationComplete', email: email });
        res.send(html);
    });

    /**
     * @description login post, if user is found will send jwt generated token for user
     */
    app.post('/security/login', async (req, res) => {
        res.redirect('https://www.google.sk');
    });

    /**
     * @description registration post, if data are correct will create new user in db and report positive response
     */
    app.post('/security/register', async (req, res) => {
        if (req.body) {
            if (!req.body.email) {
                res.send(responses.possibleResponsesRegistration.emailMissing);
            }
            if (!req.body.password) {
                res.send(responses.possibleResponsesRegistration.passwordMissing);
            }
            const [user, message] = await registerUser(req.body.email, req.body.password)
            if (user) {
                res.send(responses.possibleResponsesRegistration.registrationSuccess);
            } else {
                switch (message) {
                    case 'unexpected error':
                        res.send(responses.possibleResponsesRegistration.unexpectedError);
                        break;
                    case 'user already exists':
                        res.send(responses.possibleResponsesRegistration.emailExists)
                        break;
                    case 'user success registered':
                        res.send(responses.possibleResponsesRegistration.registrationSuccess);
                        break;
                }
            }
            return;
        }
        res.send('bad request');
        return;
    });


    app.listen(3000);

    console.log('server started');
};
