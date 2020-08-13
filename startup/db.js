const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  const connection =
    "mongodb://Admin1:Admin1@cluster0-shard-00-00.rbgkq.mongodb.net:27017,cluster0-shard-00-01.rbgkq.mongodb.net:27017,cluster0-shard-00-02.rbgkq.mongodb.net:27017/Vidly?ssl=true&replicaSet=atlas-kqmjay-shard-0&authSource=admin&retryWrites=true&w=majority";

  mongoose
    .connect(connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => winston.info(`Connected to ${connection}...`))
    .catch((err) => console.log(err));
};
