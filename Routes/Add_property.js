const express = require("express");
const router = express.Router();
const db = require("../Db");

router.post('/add_property', async (req, res) => {
  let { prop_id,seller_id,sell_price,upload_date,status } = req.body;
  try {
    var sql = `INSERT INTO Property VALUES ('${prop_id}','${seller_id}','${sell_price}' ,'${upload_date}','${status}' )`;
    db.query(sql, function (err, result) {
        if (err) {
          return res.status(400).json({
            success: false,
            message: err.message,
          });
        }
        return res.status(200).json({
          success: true,
          message: `1 record created in Property Table`,
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
