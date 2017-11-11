import { endpoint } from './Interface';
import { GithubGet } from './get';
import { GithubPost } from './post';

export const endpointsV1: endpoint[] = [
    {
        type: 'POST',
        endpointUrl: '/api/v1/git/authenticate',
        endpointFunction: GithubPost.authentication
    },
    {
        type: 'GET',
        endpointUrl: '/api/v1/git/listRepo',
        endpointFunction: GithubGet.listRepo,
    }
];
