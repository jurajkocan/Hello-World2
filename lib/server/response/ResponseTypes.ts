import { Schema } from '../../database/Schema';
import * as PasswordHash from 'password-hash';
import * as JWT from 'jsonwebtoken';

export namespace SecurityResponseTypes {
    export type commonType = {
        clientMessage: string
        description: string,
    }
    export type unexpectedError = commonType & {
        status: 'unexpected error'
    }
    export type emailExists = commonType & {
        status: 'email exists';
    }
    export type emailMissing = commonType & {
        status: 'email is missing';
    }
    export type passwordMissing = commonType & {
        status: 'password is missing';
    }
    export type registrationSuccess = commonType & {
        status: 'registration success';
    }
    export type emailPasswordMismatch = commonType & {
        status: 'emailPasswordMismatch';
    }
    type loginSuccess = commonType & {
        status: 'login success';
    }

    export type responseStatusRegistration = emailExists | registrationSuccess | emailMissing | passwordMissing | unexpectedError;
    export type responseStatusLogin = emailPasswordMismatch | loginSuccess | emailMissing | passwordMissing | unexpectedError;
}

interface responsesLogin {
    loginSuccess: SecurityResponseTypes.responseStatusLogin,
    badCredentials: SecurityResponseTypes.responseStatusLogin,
    emailMissing: SecurityResponseTypes.responseStatusLogin,
    passwordMissing: SecurityResponseTypes.responseStatusLogin,
    unexpectedError: SecurityResponseTypes.responseStatusLogin
}

interface responseRegistration {
    registrationSuccess: SecurityResponseTypes.responseStatusRegistration,
    emailExists: SecurityResponseTypes.responseStatusRegistration,
    emailMissing: SecurityResponseTypes.responseStatusRegistration,
    passwordMissing: SecurityResponseTypes.responseStatusRegistration,
    unexpectedError: SecurityResponseTypes.responseStatusRegistration
}

export namespace responses {
    export const possibleResponsesLogin: responsesLogin = {
        unexpectedError: {
            status: 'unexpected error',
            clientMessage: 'Unexpected error occurred, try again later',
            description: 'what the fuck just happened'
        },
        loginSuccess: {
            status: 'login success',
            description: 'login success',
            clientMessage: 'login success'
        },
        badCredentials: {
            status: 'emailPasswordMismatch',
            description: 'email or password are incorrect',
            clientMessage: 'email or password are incorrect'
        },
        emailMissing: {
            status: 'email is missing',
            description: 'email was missing in input data',
            clientMessage: 'email has to be set'
        },
        passwordMissing: {
            status: 'password is missing',
            description: 'password was missing in input data',
            clientMessage: 'password has to be set'
        }
    }
    export const possibleResponsesRegistration: responseRegistration = {
        unexpectedError: {
            status: 'unexpected error',
            clientMessage: 'Unexpected error occurred, try again later',
            description: 'what the fuck just happened'
        },
        registrationSuccess: {
            status: 'registration success',
            clientMessage: 'registration success',
            description: 'registration success'
        },
        emailExists: {
            status: 'email exists',
            clientMessage: 'email already exists',
            description: 'email exists is in db',
        },
        emailMissing: {
            status: 'email is missing',
            description: 'email was missing in input data',
            clientMessage: 'email has to be set'
        },
        passwordMissing: {
            status: 'password is missing',
            description: 'password was missing in input data',
            clientMessage: 'password has to be set'
        }
    }
}
