// const mongoose = require("mongodb");

// const url = "mongodb://127.0.0.1:27017";

// module.exports.connect = () => {
//   mongoose
//     .connect(url, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => {
//       console.log("MongoDB connected successfully");
//     })
//     .catch((error) => console.log("Error: ", error));
// };


const { MongoClient } = require('mongodb');
const { connect } = require('mongoose');

const url = 'mongodb+srv://malithaprabhashana:MT191222@cluster0.omqppq6.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'shopdb'; // Replace with your database name


const run = async () => {
  try {
    const client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    console.log('MongoDB connected successfully');

    const db = client.db(dbName);

    // Perform database operations with the 'db' object

    // Close the connection when finished
    await client.close();
  } catch (error) {
    console.log('Error:', error);
  }
};

module.exports = run;

// run()
// module.exports.connect


