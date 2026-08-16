import express from 'express';
import { genericUpsert } from '../controllers/genericController.js';
import { getDoc } from '../controllers/truckMovementDocumentController.js';
import TruckMovementDocument from '../models/truckMovementDocumentModel.js';
import verifyToken from '../utils/verifyUser.js';

const router = express.Router();

// Handle creation (No ID provided)
router.post('/truckMovementDocument', verifyToken, genericUpsert(TruckMovementDocument));

// Handle update by ID
router.put('/truckMovementDocument/:id', verifyToken, genericUpsert(TruckMovementDocument));

// Fetch document by ID
router.get('/get/:id', verifyToken, getDoc);

export default router;