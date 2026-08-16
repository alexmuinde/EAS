import mongoose from 'mongoose';

// Generic Upsert Controller (Create or Update)
export const genericUpsert = (Model) => async (req, res, next) => {
  try {
    const { _id, ...updateData } = req.body;
    const docId = req.params.id || _id;

    const query = docId && mongoose.Types.ObjectId.isValid(docId) 
      ? { _id: docId } 
      : { _id: new mongoose.Types.ObjectId() };

    const updatedDoc = await Model.findOneAndUpdate(
      query,
      {
        $set: updateData,
        ...(req.user?.id && { userReference: req.user.id }),
      },
      {
        returnDocument: 'after',
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    res.status(200).json(updatedDoc);
  } catch (error) {
    next(error);
  }
};

// Generic Get Document Controller (Fetch by ID)
export const genericGetDoc = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, message: "Document not found!" });
    }
    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};