var express = require("express");
var cors = require("cors");
const multer = require("multer");
require("dotenv").config();

// Configure multer
const upload = multer({ dest: "uploads/" });

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
// Add body-parser in every endpoint
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.array("upfile"), (req, res) => {
  const upfile = req.files[0];

  res.json({
    name: upfile.originalname,
    type: upfile.mimetype,
    size: upfile.size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
