const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var participantSchema = new mongoose.Schema(
  {
    mobile: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Participant", participantSchema);
