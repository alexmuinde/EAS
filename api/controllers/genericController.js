// controllers/genericController.js
export const genericUpsert = (Model) => async (req, res, next) => {
  try {
    // 1. Extract document ID if present in body or request params
    const { _id, ...updateData } = req.body;
    const docId = req.params.id || _id;

    // 2. Query by ID if provided, otherwise create a new ObjectId
    const query = docId ? { _id: docId } : { _id: new Model.db.base.Types.ObjectId() };

    // 3. Upsert into MongoDB
    const updatedDoc = await Model.findOneAndUpdate(
      query,
      {
        ...updateData,
        ...(req.user?.id && { userReference: req.user.id }), // Dynamically attach user ID if authenticated
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    res.status(200).json({
      success: true,
      message: docId ? "Document updated successfully" : "Document created successfully",
      data: updatedDoc,
    });
  } catch (error) {
    next(error);
  }
};