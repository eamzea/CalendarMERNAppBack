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
app.use(express.static(__dirname + "/public/"));
app.use(express.json());

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

//ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
