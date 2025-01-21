import express from 'express';
import { test } from '../controllers/UserController.js';




const router = express.Router();  //create the router

router.get('/test',test); //create a route for the router



export default router; //export the router
