const express = require("express");
const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  res.status(200).json({ message: "reached router GET /" });
});

module.exports = router;
