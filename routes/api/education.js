const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");

//education Model
const Education = require("../../models/education");

//route POST api/Profile/education
//@desc adding user education details
//@acess Private

router.post("/education", auth, async (req, res) => {
  const { college, program, degree } = req.body;

  //simple verification
  if (!college || !program || !degree) {
    return res.status(400).json({ msg: "please enter all fields" });
  }

  const newEducation = new Education({
    college,
    program,
    degree,
    userId: mongoose.Types.ObjectId(req.user.id),
  });

  newEducation
    .save()
    .then((education) => {
      res.json({ ...education });
    })
    .catch((err) => {
      res.json({ err });
    });
});

//route GET api/Profile/education
//@desc getting user education details
//@acess Public
router.get("/education", async (req, res) => {
  try {
    const education = await Education.find().populate("userDetails");
    res.json({
      education: education,
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

//route PUT api/Profile/education
//@desc getting user education details
//@acess Private
router.put("/education/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    await Education.findByIdAndUpdate(
      { _id: id },
      { $set: data },
      { multi: true, new: true },
      (err, education) => {
        if (err) {
          return res.status(500).json({ msg: err.message });
        }
        res.status(200).json({
          education,
        });
      }
    );
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.delete("/education/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Education.remove({ _id: id }, (err, result) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }
      res.status(200).json({
        msg: "education details deleted",
      });
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
