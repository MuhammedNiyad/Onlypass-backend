const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
require("./cronJobs/cronJobe");



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/facilities", require("./routes/facilities"));
app.use("/api/amenities", require("./routes/amenities"));
app.use("/api/equipments", require("./routes/equipments"));
app.use("/api/images", require("./routes/facility_image_upload"));
app.use("/api/gender", require("./routes/gender"));
app.use("/api/country", require("./routes/country"));
app.use("/api/tier", require("./routes/tier"));
app.use("/api/membership", require("./routes/memberShip"));
app.use("/api/facility-type", require("./routes/facility_type"));
app.use("/api/customer/", require("./routes/CustomerRoutes/customer"));
app.use("/api/customer-membership",require("./routes/CustomerRoutes/customerMembership"));
app.use("/api/category",require("./routes/category"));
app.use("/api/review",require("./routes/review"));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected 🥳...!");
  })
  .catch((err) => {
    console.log(err);
  });
//   console.log("CRo running");
// });


app.listen(process.env.PORT || 5000, () => {
  console.log("Backend is working😇...!");
});
