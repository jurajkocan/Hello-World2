import * as GitHub from 'github-api';
import * as Session from 'express-session';
import { RequestHandler } from 'express';

import { createDB } from '../database/Database';
import { webConfig } from '../WebConfig';
import { login } from '../server/user/User';
import * as JWT from 'jsonwebtoken';


export namespace GithubPost {
    export const authentication: RequestHandler = async (req, res) => {
        try {
            const data = req.body as { name: string, password: string };

            if (!data.name)
                throw 'no name provided';
            if (!data.password)
                throw 'no password provided';

            const gh = new GitHub({
                username: data.name,
                password: data.password
            });

            if (req.session) {
                req.session.Github = gh;
            }
            else
                throw 'express session missing';

            res.status(200).send(gh);
        } catch (err) {
            res.status(400).send(err);
        }
    }
}

export namespace AppPost {
    export const loginUser: RequestHandler = async (req, res) => {
        const data = req.body as { email: string, password: string };
        console.log(data);
        const db = await createDB(webConfig.databaseConfiguration.connectionString);
        const user = await login(data.email, data.password);
        if (user) {
            console.log('user', user);
            const token = JWT.sign(user, webConfig.JwtSecret, { expiresIn: webConfig.JwtExpiration });
            res.status(200).send({ token: token })
            return;
        }
        res.send('user not found');
    }
}
