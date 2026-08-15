import TruckMovementDocument from "../models/truckMovementDocumentModel.js";

// POST: Create a new document
export const createDoc = async (req, res, next) => {
  try {
    const newTruckMovementDocument = new TruckMovementDocument({
      ...req.body,
      userReference: req.user.id, // Inject authenticated user ID
    });

    const savedDoc = await newTruckMovementDocument.save();

    res.status(201).json({
      success: true,
      message: "Document Created Successfully!",
      ...savedDoc._doc,
    });
  } catch (error) {
    next(error);
  }
};

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