var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const socketio = require("socket.io");
var http = require("http");
const cors = require("cors");

const dbConnection = require("./config/mongodb");

var indexRouter = require("./routes/index");
var app = express();
dbConnection();
// view engine setup
app.use(cors());
const Message = require("./model/message");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
const server = http.createServer(app);
const io = socketio(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});
const Participant = require("./model/participant");
io.on("connection", async function (client) {
  // console.log(client);
  console.log(`Socket ${client.id} connected`);

  // console.log(await Participant.find());

  client.on("join chat", ({ participantId, phone }) => {
    client.join(participantId);
    console.log("User joined room: " + participantId);
  });

  client.on("typing", ({ participantId, phone }) => {
    console.log("User typing: " + participantId);
    client.to(participantId).emit("typing", { participantId, phone });
  });

  client.on("chat", async (message) => {
    const { participantId, msg } = message;
    if (participantId) {
      const messageObj = new Message({
        ...message,
      });
      const m = await messageObj.save();
      console.log(m);
      client.to(participantId).emit("chat", m);
    }
  });
});
server.listen(4000, () => {
  console.log(`Server running on port ${4000}`);
});

module.exports = app;
