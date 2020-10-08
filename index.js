require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const PORT = process.env.PORT;
const db = require("./db/config");
const cors = require("cors");

//APP INITIALIZATION
const app = express();

//DATABASE CONNECTION
db();

//CORS
app.use(cors());

//APP CONFIG
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());

//ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
