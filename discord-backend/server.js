const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();

app.use(express.json());
app.use(cors());

// resgister the route
app.use('/api/auth', authRoutes);

const server = http.createServer(app);

//Set up default mongoose connection
const mongoDB = process.env.MONGO_URI;
mongoose
  .connect(mongoDB)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Database connection failed, Server not started');
    console.log(error);
  });
