const express = require("express");
const router = express.Router();
const db = require("../Db");

router.post("/view", async (req, res) => {
  let { table } = req.body;
  try {
    db.query(`SELECT * FROM ${table}`, function (err, result, fields) {
      if (err)
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      //console.log(result.fields);
      res.json({
        success : true ,
        fields : fields,
        fulldata : result
      })
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
});

module.exports = router;
