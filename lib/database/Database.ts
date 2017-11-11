import { MongoClient } from 'mongodb';
import { mongoRTWrapper } from 'mongo-iots-wrapper';
import { Schema, User } from './Schema';

/**
 * Create db driver
 * @param dbConnect - connection string into the mongo db
 */
export const createDB = async (dbConnect: string): Promise<Schema> => {
    try {
        const client = await MongoClient.connect(dbConnect);
        const iotsWrapper = await mongoRTWrapper(
            {
                Collections: {
                    users: User
                },
                Documents: {
                }
            },
            client
        );
        return iotsWrapper;
    } catch (e) {
        throw (`can not connect to: ${dbConnect},  ${e}`);
    }
};
