import * as express from 'express';
export const getAuth = (req: express.Request) => {
    const authentication = req.get('Authorization');

}
