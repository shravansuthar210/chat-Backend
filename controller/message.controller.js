const Message = require("../model/message");

exports.getAllMessage = async (req, res) => {
  try {
    const { participantId } = req.params;
    const msg = await Message.find({
      participantId,
    })
      .sort({ _id: -1 })
      .lean();
    console.log(msg);
    return res.status(200).json({
      message: "success",
      participantId,
      msg,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("something went wrong");
  }
};
