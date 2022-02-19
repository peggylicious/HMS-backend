const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser= require("body-parser");
var cors = require('cors')
const authRoutes = require('./routes/auth');

// const router = express.Router()

// Connect to DB
mongoose.connect('mongodb+srv://margaret:' + 'margaret' + '@cluster0.lxpah.mongodb.net/hms?retryWrites=true&w=majority', {
    // useMongoClient: true
    // useCreateIndex: true,
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//   );
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });
app.use(cors())

app.use("/user", authRoutes)

// error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
      error: {
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
      },
    });
  });

module.exports = app;