const mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Alpha",
  database: "project",
});


let connect = () => {
  db.connect(function (err) {
    if (err) {
      console.error("Database connection failed: " + err.stack);
      return;
    }
    console.log("Connected to database.");
  });
};
(module.exports = db), { connect };
