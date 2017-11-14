import { endpoint } from './Interface';
import { GithubGet } from './Get';
import { GithubPost, AppPost } from './Post';

export const endpointsV1: endpoint[] = [
    {
        type: 'POST',
        endpointUrl: '/api/v1/git/authenticate',
        endpointFunction: GithubPost.authentication
    },
    {
        type: 'POST',
        endpointUrl: '/api/v1/app/loginUser',
        endpointFunction: AppPost.loginUser,
    },
    {
        type: 'GET',
        endpointUrl: '/api/v1/git/listRepo',
        endpointFunction: GithubGet.listRepo,
    }
];
