const express = require("express");
const router = express.Router();
const db = require("../Db");

router.post("/add_transaction_details", async (req, res) => {
  let {
    transaction_id,
    Date,
    Final_Price,
    buyer_id,
    seller_id,
    agent_id,
    property_id,
  } = req.body;
  try {
    var sql = `INSERT INTO transaction VALUES  ('${transaction_id}','${Date}',${Final_Price},'${buyer_id}','${seller_id}','${agent_id}','${property_id}')`;
    db.query(sql, function (err, result) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }
      return res.status(200).json({
        success: true,
        message: `1 record created in Transaction Table`,
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
