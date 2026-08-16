import express from 'express';
import { genericUpsert, genericGetDoc } from '../controllers/genericController.js';

import TruckMovementDocument from '../models/truckMovementDocumentModel.js';
import WeighbridgeReceipt from '../models/weighbridgeReceiptModel.js';
import TruckSafetyInspectionForm from '../models/truckSafetyInspectionFormModel.js';



import verifyToken from '../utils/verifyUser.js';

const router = express.Router();


router.post('/truckMovementDocument', verifyToken, genericUpsert(TruckMovementDocument));
router.put('/truckMovementDocument/:id', verifyToken, genericUpsert(TruckMovementDocument));
router.get('/get/:id', verifyToken, genericGetDoc(TruckMovementDocument));


router.post('/weighbridgeReceipt', verifyToken, genericUpsert(WeighbridgeReceipt));
router.put('/weighbridgeReceipt/:id', verifyToken, genericUpsert(WeighbridgeReceipt));
router.get('/weighbridgeReceipt/get/:id', verifyToken, genericGetDoc(WeighbridgeReceipt));

router.post('/truckSafetyInspectionForm', verifyToken, genericUpsert(TruckSafetyInspectionForm));
router.put('/truckSafetyInspectionForm/:id', verifyToken, genericUpsert(TruckSafetyInspectionForm));
router.get('/truckSafetyInspectionForm/get/:id', verifyToken, genericGetDoc(TruckSafetyInspectionForm));



export default router;