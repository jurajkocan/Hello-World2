import * as PasswordHash from 'password-hash';
import { Type } from '../../database/Schema';

import { Schema } from '../../database/Schema';
import { createDB } from '../../database/Database';
import { webConfig } from '../../WebConfig';

/**
 * @description return user object and status message if user was success loggedIn or null and status message if login failed
 * @param {string} email email of user to be registered with
 * @param {string }password password of user to be registered with
 */
export const login = async (email: string, password: string): Promise<[null, string] | [Type.UserDbType, string]> => {
    try {
        const db = await createDB(webConfig.databaseConfiguration.connectionString);
        const found = await db.Collections.users.findByKey('email', email);
        if (found) {
            const dbUser = found[0];
            if (PasswordHash.verify(password, dbUser.password)) {
                return [dbUser, 'loggedIn'];
            }
            return [null, 'incorrect password']
        }
        return [null, 'incorrect email'];
    } catch (err) {
        return [null, err];
    }
}

/**
 * @description return user object and status message if user was success registered or null and status message if registered failed
 * @param {string} email email of user to be registered with
 * @param {string }password password of user to be registered with
 */
type statusMessage = 'user already exists' | 'user success registered' | 'unexpected error';
export const registerUser = async (email: string, password: string): Promise<[null, statusMessage] | [Type.UserDbType, statusMessage]> => {
    const db = await createDB(webConfig.databaseConfiguration.connectionString);
    try {
        const found = await db.Collections.users.findByKey('email', email);

        if (found && found.length > 0) {
            return [null, 'user already exists'];
        }

        const user = {
            email: email,
            password: PasswordHash.generate(password)
        }

        await db.Collections.users.insertOne(user);

        return [user, 'user success registered'];
    }
    catch (err) {
        db.Collections.errors.insertOne({
            error: err,
            description: `registerUser failed, email: ${email}`
        })
        return [null, 'unexpected error']
    }
}
