import TruckMovementDocument from "../models/truckMovementDocumentModel.js";


// GET: Retrieve an existing document by ID
export const getDoc = async (req, res, next) => {
  try {
    const doc = await TruckMovementDocument.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, message: "Document not found!" });
    }
    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};