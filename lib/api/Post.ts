import * as GitHub from 'github-api';
import * as Session from 'express-session';
import { RequestHandler } from 'express';

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

export namespace dsa {

}
