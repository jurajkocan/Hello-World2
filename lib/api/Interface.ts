import { RequestHandler } from "express";

// export type callback = async function (req: Request, res: Response):
export interface endpoint {
    type: 'POST' | 'GET';
    endpointUrl: string;
    endpointFunction: RequestHandler;
}
