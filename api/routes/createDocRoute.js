import express from 'express';
import { createDoc, getDoc } from '../controllers/createDocController.js';
import verifyToken from '../utils/verifyUser.js';

const router = express.Router();

// Route to create document
router.post('/truckMovementDocument', verifyToken, createDoc);

// Route to fetch document by ID
router.get('/get/:id', verifyToken, getDoc);

export default router;