import express from 'express';
import { forgotPasswordController, loginController, resetPasswordController } from '../controller/authContoller.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';

const authRouter = express.Router();

authRouter.post('/login',loginController);
authRouter.post('/forgotPassword',forgotPasswordController);
authRouter.post('/resetPassword', authMiddleware,resetPasswordController)

export default authRouter;