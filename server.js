const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const  authRoutes = require('./src/routes/userRoutes');
const courseRoutes = require('./src/routes/courseRoutes');
const lectureRoutes = require('./src/routes/lecturesRoutes');
const enrollmentRoutes = require('./src/routes/enrollmentRoutes');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5200;

app.use(cors());
app.use(express.json());
app.use((req,res,next) => {
  console.log("HTTpl Method: " + req.method + " " + req.url)
  next();
})
app.use(express.urlencoded({
  extended: true
}));

app.use('/', authRoutes);
app.use('/', courseRoutes);
app.use('/', lectureRoutes);
app.use('/', enrollmentRoutes);



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
