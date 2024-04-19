const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const cookieParser = require('cookie-parser');
const db = require("./Db");
const add_agent = require("./Routes/Add_buyer")
const Viewdata = require("./Routes/Viewdata")
const add_property = require("./Routes/Add_property")
const add_transaction_details = require("./Routes/Add_transaction_details")
const add_property_details = require("./Routes/Add_prop_details")
db.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    console.log('Connected to database.');
  });

app.use(cookieParser());
app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );

app.use(express.json())
app.use("/api/v1" , add_agent);
app.use("/api/v1" , Viewdata);
app.use("/api/v1" , add_transaction_details);
app.use("/api/v1" , add_property);
app.use("/api/v1" , add_property_details);

app.get("/", (req,res) => {
    console.log(`Hello`);
    res.send("Heloo")
  });
app.listen(port, () => {
    console.log(`SERVER STARTED AT PORT ${port}`);
  });