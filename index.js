const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
app.use(cors());
app.use(express.json());



app.use('/api/fecilities', require('./routes/fecilities'));
app.use('/api/amenities', require('./routes/amenities'));
app.use('/api/equipments', require('./routes/equipments'));
app.use('/api/images', require('./routes/fecility_image_upload'));
app.use('/api/gender', require('./routes/gender'));
app.use('/api/country', require('./routes/country'));
app.use('/api/tier', require('./routes/tier'));
app.use('/api/fecility-type', require('./routes/fecility_type'));


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected 🥳...!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend is working😇...!");
});