// app.js
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({origin: ['http://localhost:3001'],credentials: true}));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Route files
const myRoute = require('./route.js');
app.use('/api',myRoute);

