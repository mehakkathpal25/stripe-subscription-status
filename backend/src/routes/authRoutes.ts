import express from 'express';
import { forgotPasswordController, loginController, refreshTokenController, resetPasswordController } from '../controller/authContoller.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';

const authRouter = express.Router();

authRouter.get('/test', (req, res) => {
    res.status(200).json({ message: "Test route is working" });
});
authRouter.post('/login',loginController);
authRouter.post('/forgotPassword',forgotPasswordController);
authRouter.post('/resetPassword', authMiddleware,resetPasswordController)
authRouter.post('/refreshToken', refreshTokenController);

export default authRouter;