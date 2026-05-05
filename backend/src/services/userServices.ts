import { client } from "../db.ts";
import { type createUserInput } from "../schema/user.schema.ts";
import bcrypt from 'bcrypt';

const db = client.db('stripe-info-data')

export const getUsers = async () => {
        const users = await db.collection('users').find({}, { projection: { password: 0 } }).toArray();
        return users;
    } 

export const getUserByEmail = async (email: string) => {
        const user = await db.collection('users').findOne({ email }, { projection: { password: 0 } });
        if (user) {
            return user;
        }
        throw new Error("user not found");
}

export const updateUser = async (email: string, data: Partial<createUserInput>) => {
        const result = await db.collection('users').updateOne({ email }, { $set: data });
        if (result.modifiedCount > 0) {
            return { message: "user updated successfully" };
        }else {
            throw new Error("user not found");
        }
    }

export const deleteUser = async (email: string) => {
        const result = await db.collection('users').deleteOne({ email });
        if (result.deletedCount > 0) {
            return { message: "user deleted successfully" };
        } else {
            throw new Error("user not found");
        }
}
