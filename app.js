const bootcampRouter = require("./routes/bootcamp-router");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

//set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//set routing
app.use("/api/bootcamp", bootcampRouter);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
