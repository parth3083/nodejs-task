const express = require("express");
const addSchool = require("./routes/addSchool");
const listSchool = require("./routes/listSchools");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Backend started working ");
});

app.post("/addSchool", addSchool);
app.get("/listSchools", listSchool);

app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
