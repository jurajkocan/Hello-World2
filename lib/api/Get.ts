import * as GitHub from 'github-api';
import * as Session from 'express-session';
import { RequestHandler } from 'express';

export namespace GithubGet {
    export const listRepo: RequestHandler = async (req, res) => {
        try {
            console.log('jebem');
            if (req.session) {
                console.log('jebem session');
                if (req.session.GitHub) {
                    console.log('jebem session github');
                    const gh = req.session.GitHub as GitHub;
                    console.log(gh);
                    const user = await gh.getUser();
                    const repo = await user.listRepos();
                    res.status(200).send(repo);
                }
                res.status(400).send('no authenticated request');
            }
            res.status(400).send('session missing');
        }
        catch (err) {
            res.status(400).send('uups');
        }
    }
}
