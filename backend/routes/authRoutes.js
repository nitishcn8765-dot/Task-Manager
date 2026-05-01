const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);

router.get("/get-user", async (req, res) => {
  const user = await User.findOne({ email: req.query.email });
  res.json(user);
});

module.exports = router;