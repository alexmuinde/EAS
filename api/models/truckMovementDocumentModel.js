import mongoose from "mongoose";

const TruckMovementDocumentSchema = new mongoose.Schema(
  {
    userReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Top Section
    firstTodaysDate: { type: String },
    firstClient: { type: String },
    firstTruckNumber: { type: String },
    transpoter: { type: String },

    // Security Section
    secondTodaysDate: { type: String },
    thirdTodaysDate: { type: String },
    secondClient: { type: String },
    secondTruckNumber: { type: String },

    // Surveyor Section
    securityName: { type: String },
    driversName: { type: String },
    idNumber: { type: String },
    firtTimeIn: { type: String },
    inspectedBy: { type: String },
    timeChecked: { type: String },
    firstProduct: { type: String },

    // Surveyor/Driver/Clerk Section
    firstCompatment: { type: String },

    // Weighing Personnel Section
    firstName: { type: String },
    secondProduct: { type: String },
    secondTimeIn: { type: String },
    tareWeight: { type: String },

    // Delivery Supervisor Section 1
    secondName: { type: String },
    thirdProduct: { type: String },
    loadingTank: { type: String },
    loaderName: { type: String },

    // Delivery Supervisor Section 2
    timeOutofBay: { type: String },
    bayNumber: { type: String },
    firstCompartmentSeal: { type: String },

    // Dispatch Supervisor Section
    thirdName: { type: String },

    // Dispatch Personnel Section
    forthName: { type: String },
  },
  { timestamps: true }
);

const TruckMovementDocument = mongoose.model(
  "TruckMovementDocument",
  TruckMovementDocumentSchema
);

export default TruckMovementDocument;