var express = require("express");
var router = express.Router();
const { getAllMessage } = require("../controller/message.controller");
const {
  createParticipant,
  getAllParticipant,
} = require("../controller/contact.controller");

/* GET home page. */
router.get("/getAllParticipant/:phoneNumber", getAllParticipant);
router.post("/createContact", createParticipant);
router.get("/getAllMessage/:participantId", getAllMessage);

module.exports = router;
