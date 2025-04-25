const express = require("express");
const router = express.Router();
const {db} = require("../Db");

router.post("/add_property_details", async (req, res) => {
  let {
    prop_id,
    area,
    bedrooms,
    swimming_pool,
    city,
    district,
    house_no,
    imge_link,
  } = req.body;
  try {
    var sql = `INSERT INTO property_details VALUES  ('${prop_id}','${area}',${bedrooms},${swimming_pool},'${city}','${district}',${house_no},'${imge_link}')`;
    db.query(sql, function (err, result) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }
      return res.status(200).json({
        success: true,
        message: `1 record created in Property Details Table`,
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
