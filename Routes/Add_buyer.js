const express = require("express");
const router = express.Router();
const db = require("../Db");

router.post('/add_buyer', async (req, res) => {
  let { agent_id, name, email, phone_number , table } = req.body;
  try {
    var sql = `INSERT INTO ${table} VALUES ('${agent_id}','${name}','${phone_number}','${email}')`;
    db.query(sql, function (err, result) {
        if (err) {
          return res.status(400).json({
            success: false,
            message: err.message,
          });
        }
        return res.status(200).json({
          success: true,
          message: `1 record created in ${table} Table`,
        });
      });
  } catch (e) {
    return res.status(500).json({
        success: false,
        message: e.message,
      });
  }
});

module.exports = router;
