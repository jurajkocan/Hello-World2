import { startServer } from './server/Server';
import { webConfig } from './WebConfig';
import { createDB } from './database/Database';

const main = async () => {

    const db = await createDB(webConfig.databaseConfiguration.connectionString);
    startServer(db);
    // const gh = new GitHub({
    //     token: '7f8dd61dcff2d23650ac2911a814ed8d566730fe'
    // });
    // console.log('user: ', await gh.getUser());
    // const user = await gh.getUser();
    // console.log(user);
    // const repo = await user.createRepo({
    //     "name": "Hello-World2",
    //     "description": "This is your first repository",
    //     "homepage": "https://github.com",
    //     "private": false,
    //     "has_issues": true,
    //     "has_projects": true,
    //     "has_wiki": true
    // });
    // console.log(repo);

    // const u = await gh.getIssues('as', 'as');
    // u.editIssue(12, { a: 12 }, main);

    // var organization = gh.getOrganization('wabautomations');
    // console.log(await organization.listMembers());
    // organization.createRepo({
    //     "name": "Hello-World2",
    //     "description": "This is your first repository",
    //     "homepage": "https://github.com",
    //     "private": false,
    //     "has_issues": true,
    //     "has_projects": true,
    //     "has_wiki": true
    // });
};

main();
