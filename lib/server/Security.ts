import { Schema } from '../database/Schema';
import * as JWT from 'jsonwebtoken';

export namespace SecurityResponse {
    export type emailExists = 'email exists';
    export type emailMissing = 'email is missing';
    export type passwordMissing = 'password is missing';
    export type registrationSuccess = 'registration success';
    export type emailPasswordMismatch = 'email and password do not match';
    export type loginSuccess = 'login success'

    export type responseStatusRegistration = emailExists | registrationSuccess | emailMissing | passwordMissing;
    export type responseStatusLogin = emailPasswordMismatch | loginSuccess | emailMissing | passwordMissing;

}

export interface ResponseStatusRegister {
    type: 'registration'
    status: SecurityResponse.responseStatusRegistration,
    message: string,
}

export interface ResponseStatusLogin {
    type: 'login'
    status: SecurityResponse.responseStatusLogin,
    message: string,
}

export const registerUser = async (db: Schema, email: string, password: string): Promise<ResponseStatusRegister> => {
    const found = await db.Collections.users.findByKey('email', email);
    if (found && found.length > 0) {
        return {
            type: 'registration',
            status: 'email exists',
            message: 'email adress already exists',
        }
    }

    const data = db.Collections.users.insertOne({
        email: email,
        password: password
    });
    return {
        type: 'registration',
        status: 'registration success',
        message: 'registration success',
    }
}

export const loginUser = (db: Schema, email: string, password: string) => {
    return 1;
}
