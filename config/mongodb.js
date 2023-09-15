const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    //mongodb connection
    const con = await mongoose.connect(
      "mongodb+srv://CRM:brw8uAmGBSkQXswO@cluster0.zxorkjd.mongodb.net/chat?retryWrites=true&w=majority",

      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`Mongodb connected ${con.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = dbConnection;
