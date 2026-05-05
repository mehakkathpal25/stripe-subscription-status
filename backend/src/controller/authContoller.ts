import express from 'express';
import * as authService from '../services/authServices.ts';
import {loginSchema, resetPasswordSchema, signupSchema} from '../schema/auth.schema.ts';
import { ZodError } from 'zod';

export const singUpController = async(req: express.Request, res: express.Response) => {
    const data = signupSchema.parse(req.body);
    try {
        const result = await authService.signUp(data);
        return res.status(200).json(result);
    }catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({message: "Validation error", errors: error.message});
        }
        if (error instanceof Error) {
            return res.status(400).status(400).json({message: error.message || "Signup failed"});
        }
        return res.status(500).json({message: "Internal server error"});
    }
}

export const loginController = async(req: express.Request, res: express.Response) => {
    const data = loginSchema.parse(req.body);
    try {
        const result = await authService.login(data);
        return res.status(200).json(result);
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({message: "Validation error", errors: error.message});
        }
        if (error instanceof Error) {
            return res.status(400).json({message: error.message || "Login failed"});
        }
        return res.status(500).json({message: "Internal server error"});
    }
}

export const forgotPasswordController = async(req: express.Request, res: express.Response) => {
    const email = req.body.email as string;
    try {
        const result = await authService.forgotPassword(email);
        if(result) {
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(400).json({message: (error as Error).message || "Forgot password failed"});
    }
}

export const resetPasswordController = async(req: express.Request, res: express.Response) => {
    const data = resetPasswordSchema.parse(req.body);
    try {
        const result = await authService.resetPassword(data);
        if(result) {
            return res.status(200).json(result);
        }
    } catch (error) {
        if(error instanceof ZodError) {
            return res.status(400).json({error: "Validation error", errors: error.message});
        }
        if(error instanceof Error) {
            return res.status(400).json({error: error.message || "Reset password failed"});
        }
        return res.status(500).json({error: "Internal server error"});
    }
}

export const refreshTokenController = async(req: express.Request, res: express.Response) => {
    try{
        const refreshToken = req.cookies?.refreshToken;
        console.log(refreshToken,"refresh token in controller")
        if(!refreshToken) {
            return res.status(401).json({message: "Refresh token missing"});
        }
        const result = await authService.refreshToken(refreshToken);
        return res.status(200).json(result);
    }
    catch(error){
        if(error instanceof Error) {
            return res.status(400).json({error: error.message || "Refresh token failed"})
        }
        return res.status(400).json({message: (error as Error).message || "Refresh token failed"});
    }
    
}
