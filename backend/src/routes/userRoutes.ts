import express from 'express';
import { createUser, getUserByEmail, getUsers, updateUser, deleteUser } from '../controller/userContoller.ts';


const router = express.Router();

router.post('/createUser', createUser);
router.get('/getUsers',getUsers);
router.get('/getUserByEmail/:email', getUserByEmail);
router.put('/updateUser/:email', updateUser)
router.delete('/deleteUser/:email', deleteUser);

export default router;