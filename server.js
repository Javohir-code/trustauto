const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./controllers/db');
const path = require('path');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(express.json());

app.use('/', require('./routes/clients'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`${PORT} port listened in ${process.env.NODE_ENV} mode...`);
});
