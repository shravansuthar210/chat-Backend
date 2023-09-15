const Participant = require("../model/participant");

exports.createParticipant = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json("error found");
    }
    const { mobile } = req.body;
    const participant = new Participant({ mobile });
    const participantSave = await participant.save();

    return res.status(200).json({
      message: "success",
      participant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("something went wrong");
  }
};
exports.getAllParticipant = async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    console.log(phoneNumber);
    const participant = await Participant.find({
      mobile: { $in: [phoneNumber] },
    });
    console.log(participant);
    return res.status(200).json({
      message: "success",
      participant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("something went wrong");
  }
};
