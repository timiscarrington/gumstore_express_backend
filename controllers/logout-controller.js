const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.json({ message: "Successfully logged out." });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
