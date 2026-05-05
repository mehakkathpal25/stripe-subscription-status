import express from 'express';
import { createUserSchema } from '../schema/user.schema.ts';
import * as authService from '../services/userServices.ts'; 


export const getUsers = async (req: express.Request, res: express.Response) => {
    try{
        const result = await authService.getUsers();
        if (result) {
            return res.status(200).json(result);
        }
        return res.status(404).json({ message: "no users found" });
    }
    catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
    
}

export const getUserByEmail = async(req: express.Request, res: express.Response) => {
    try {
        const email = req.params.email[0];
        const user = await authService.getUserByEmail(email);
        if(user) {
            return res.status(200).json(user);
        }
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
    return res.status(404).json({message: "user not found"});
}

export const updateUser = async(req: express.Request, res: express.Response) => {
    try {
        const email = req.params.email[0];
        const data = req.body;
        const result = await authService.updateUser(email, data);
        if(result.message === "user updated successfully") {
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
    return res.status(404).json({message: "user not found"});
}

export const deleteUser = async(req: express.Request, res: express.Response) => {
    try {
        const email = req.params.email[0];
        const result = await authService.deleteUser(email);
        if(result) {
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
    return res.status(404).json({message: "user not found"});
}