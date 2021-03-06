import * as t from 'io-ts';
import { Structure } from 'mongo-iots-wrapper';

export const User = t.interface({
    email: t.string,
    password: t.string
});

export const LogError = t.interface({
    error: t.any,
    description: t.string
})

export namespace Type {
    export type UserDbType = t.TypeOf<typeof User>;
}

export type Schema = Structure<{
    Collections: {
        users: typeof User
        errors: typeof LogError
    },
    Documents: {

    }
}>;
