declare module "github-api" {
    interface Auth {
        /**
         * @description the Github username
         */
        username?: string;
        /**
         * @description the user's password
         */
        password?: string
        /**
         * @description an OAuth token
         */
        token?: string
    }

    type callback = (error: object, result: object | true, request: object) => any

    class Requestable {
        // /**
        //  * @param auth the credentials to authenticate to Github. If auth is not provided request will be made unauthenticated
        //  * @param apiBase the base Github API URL
        //  * @param AcceptHeader the accept header for the requests
        //  */
        // constructor(auth?: Auth, apiBase?: string, AcceptHeader?: string)

        // /**
        //  * @param date the object to attempt to cooerce into an ISO date string
        //  */
        // _dateToISO(date: any): string

        // /**
        //  * @param requestOptions the current options for the request
        //  */
        // protected _getOptionsWithDefaults(requestOptions?: object): object

        // _request(method: string, path: string, data?: any, cb?: callback, raw?: boolean): Promise<any>
    }

    interface Organization {
        listMembers(): {},
        createRepo(opt: {}): {}
    }

    class Gist {
        /**
         * @param id the id of the gist (not required when creating a gist)
         * @param auth information required to authenticate to Github
         * @param apiBase the base Github API URL
         */
        constructor(id: number, auth?: Auth, apiBase?: string)

        create(gist: any, cb?: callback): Promise<any>
    }

    class Issue {
        /**
         * @param repository the full name of the repository (:user/:repo) to get issues for
         * @param auth information required to authenticate to Github
         * @param apiBase the base Github API URL
         */
        constructor(repository: string, auth?: Auth, apiBase?: string)

        /**
         * @param issueData the issue to create
         * @param cb: will receive the created issue
         */
        createIssue(issueData: object, cb?: callback): Promise<any>

        /**
         * @param issue the id of the issue to comment on
         * @param comment the comment to add
         * @param cb will receive the created comment
         */
        createIssueComment(issue: number, comment: string, cb?: callback): Promise<any>

        /**
         * @param labelData the label definition
         * @param cb will receive the object representing the label
         */
        createLabel(labelData: object, cb?: callback): Promise<any>

        /**
         * @param milestoneData the milestone definition
         * @param cb will receive the milestone
         */
        createMilestone(milestoneData: object, cb?: callback): Promise<any>

        /**
         * @param id the comment id to delete
         * @param cb will receive true if the request is successful
         */
        deleteIssueComment(id: number, cb?: callback): Promise<any>

        /**
         * @param label the name of the label to delete
         * @param cb will receive the status
         */
        deleteLabel(label: string, cb?: callback): Promise<any>

        /**
         * @param milestone the id of the milestone to delete
         * @param cb will receive the status
         */
        deleteMilestone(milestone: string, cb?: callback): Promise<any>

        /**
         * @param issue the issue number to edit
         * @param issueData the new issue data
         * @param cb will receive the modified issue
         */
        editIssue(issue: number, issueData: object, cb?: callback): Promise<any>

        /**
         * @param id the comment id to edit
         * @param comment the comment to edit
         * @param cb will receive the edited comment
         */
        editIssueComment(id: number, comment: string, cb?: callback): Promise<any>

        /**
         * @param label the name of the label to edit
         * @param labelData the updates to make to the label
         * @param cb will receive the updated label
         *
         */
        editLabel(label: string, labelData: object, cb?: callback): Promise<any>

        /**
         * @param milestone the id of the milestone to edit
         * @param milestoneData the updates to make to the milestone
         * @param cb will receive the updated milestone
         */
        editMilestone(milestone: string, milestoneData: object, cb?: callback): Promise<any>

        /**
         * @param issue the issue number to fetch
         * @param cb will receive the issue
         */
        getIssue(issue: number, cb?: callback): Promise<any>

        /**
         * @param id the comment id to get
         * @param cb will receive the comment
         */
        getIssueComment(id: number, cb?: callback): Promise<any>

        /**
         * @param label the name of the label to fetch
         * @param cb will receive the label
         */
        getLabel(label: string, cb?: callback): Promise<any>

        /**
         * @param milestone the id of the milestone to fetch
         * @param cb will receive the milestone
         */
        getMilestone(milestone: string, cb?: callback): Promise<any>

        /**
         * @param issue the id of the issue to get comments from
         * @param cb will receive the comments
         */
        listIssueComments(issue: number, cb?: callback): Promise<any>

        /**
         * @param issue the issue to get events for
         * @param cb will receive the list of events
         */
        listIssueEvents(issue: number, cb?: callback): Promise<any>

        /**
         * @param options filtering options
         * @param cb will receive the array of issues
         */
        listIssues(options: object, cb?: callback): Promise<any>

        /**
         * @param options filtering options
         * @param cb will receive the array of labels
         */
        listLabels(options: object, cb?: callback): Promise<any>

        /**
         * @param options filtering options
         * @param cb will receive the array of milestones
         */
        listMilestones(options: object, cb?: callback): Promise<any>
    }

    class Markdown {

    }

    class RateLimit {

    }

    class Repository {

    }

    class User {
        /**
         * @param username the user to use for user-scoped queries
         * @param auth information required to authenticate to Github
         * @param apiBase the base Github API URL
         */
        constructor(username?: string, auth?: Auth, apiBase?: string);

        /**
         * @param options the repository definition
         * @param cb will receive the API response
         */
        createRepo(options: object, cb?: callback): Promise<any>

        /**
         * @param username the user to follow
         * @param cb will receive true if the request succeeds
         */
        follow(username: string, cb?: callback): Promise<any>

        /**
         * @param cb will receive the list of emails
         */
        getEmails(cb?: callback): Promise<any>

        /**
         * @param cb will receive the user's information
         */
        getProfile(cb?: callback): Promise<any>

        /**
         * @param cb: will receive the list of gists
         */
        listGists(cb?: callback): Promise<any>

        /**
         * @param options any options to refine the search
         * @param cb will receive the list of repositories
         */
        listNotifications(options?: object, cb?: callback): Promise<any>

        /**
         * @param cb will receive the list of organizations
         */
        listOrgs(cb?: callback): Promise<any>

        /**
         * @param options any options to refine the search
         * @param cb will receive the list of repositories
         */
        listRepos(options?: object, cb?: callback): Promise<any>

        /**
         * @param cb will receive the list of starred repositories
         */
        listStarredRepos(cb?: callback): Promise<any>

        /**
         * @param username the user to unfollow
         * @param cb receives true if the request succeeds
         */
        unfollow(username: string, cb?: callback): Promise<any>
    }

    class Search {

    }

    /**
     * GitHub encapsulates the functionality to create various API wrapper objects.
     */
    class GitHub {
        /**
         * @param auth 	the credentials to authenticate to Github. If auth is not provided requests will be made unauthenticated
         * @param apiBase the base Github API URL
         */
        constructor(auth?: Auth, apiBase?: string);

        /**
         * @param user the username (or the full name)
         * @param repo the repository name, must not be passed if user is the full name
         */
        _getFullName(user: string, repo: string): string;

        /**
         * @param id the id for the gist, leave undefined when creating a new gist
         */
        getGist(id?: number): Gist

        /**
         * @param user the user who owns the respository
         * @param name the name of the repository
         */
        getIssues(user: string, repo: string): Issue

        getMarkdown(): Markdown

        /**
         * @param name the name of the organization
         */
        getOrganization(name: string): Organization;

        /**
         * @param id the id of the project
         */
        getProject(id: number): Markdown

        getRateLimit(): RateLimit

        /**
         * @param user the user who owns the respository
         * @param repo the name of the repository
         */
        getRepo(user: string, repo: string): Repository

        /**
         * @param teamId the name of the team
         * @return unknown type from doc (team)
         */
        getTeam(teamId: number): any

        /**
        * @param user the name of the user to get information about leave undefined for the authenticated user
         */
        getUser(user?: string): User

        /**
         * @param querry the query to search for
         */
        search(query: string): Search
    }

    namespace GitHub { }
    export = GitHub;
}
