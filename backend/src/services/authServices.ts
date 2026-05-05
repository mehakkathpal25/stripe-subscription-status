import express from 'express';
import { type resetPasswordType, type loginType } from '../schema/auth.schema.ts';
import { client } from '../db.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const ACCESS_SECRET = "your_access_secret_key";
const REFRESH_SECRET = "your_refresh_secret_key";


const db = client.db('stripe-info-data')

export const login = async(data: loginType)=> {
    const {email, password} = data;
    const user = await db.collection('users').findOne({email});
    if(!user) {
        throw new Error("invalid email or password");
    }
    const hashedPassword =  await bcrypt.compare(password,user.password);
    if(!hashedPassword){
        throw new Error("invalid email or password");
    }
    const access_token = jwt.sign(
        { userId: user._id, email: user.email },
        ACCESS_SECRET,
        { expiresIn: '7d' } // adjust as needed
    );
    const refresh_token = jwt.sign(
        { userId: user._id, email: user.email },
        REFRESH_SECRET,
        { expiresIn: '30d' } // adjust as needed
    );
    return {message: "login successful", access_token, refresh_token};
}

export const forgotPassword = async (email:string) => {
    const user = await db.collection('users').findOne({email});
    if(!user) {
        throw new Error("User not found");
    }
    return {message: "forgot password successful"};
}

export const resetPassword = async (data: resetPasswordType) => {
    const {email, newPassword} = data;
    const user = await db.collection('users').findOne({email});
    if(!user) {
        throw new Error("User not found");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.collection('users').updateOne({email}, {$set: {password: hashedPassword}});
    return {message: "password reset successful"};
}