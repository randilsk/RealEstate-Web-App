import express from 'express';
import { signup, signin, google, signout, deleteUser } from '../controllers/auth.controlller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { getUsers } from '../controllers/getusers.js';


const router = express.Router();  

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.get('/signout', signout);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.get('/users',getUsers);



export default router;