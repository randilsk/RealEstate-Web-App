/*import express from 'express';
import { test } from '../controllers/UserController.js';
import { createUser } from '../controllers/UserController.js';
//import { createProperty } from '../controllers/UserController.js';

const router = express.Router();  //create the router

router.get('/test',test); //create a route for the router

router.post('/create',createUser);//create the router

//router.post('/properties',createProperty);//create the router

export default router; //export the router
*/

import express from 'express';
import { createUser, createUser3, createProperty } from '../controllers/UserController.js';

const router = express.Router();

router.post('/users', createUser);
router.post('/users3', createUser3);
router.post('/properties', createProperty);

export default router;
