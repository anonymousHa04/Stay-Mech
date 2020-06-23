const express = require("express");
const router = express.Router();

const Practice = require("../../models/practice");

//route GET api/practice
//@desc getting Practice contents
//@acess Public

router.get("/", async (req, res) => {
  let i = 0;
  try {
    await Practice.find({}, (err, practice) =>
      res.send(
        practice.reduce((practiceMap, content) => {
          practiceMap[i++] = content;
          return practiceMap;
        }, [])
      )
    );
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
