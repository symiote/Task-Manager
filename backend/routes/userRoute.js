const router = require("express").Router();;
const { SignUp, Login } = require("../controllers/userController");

router.post("/sign-in", SignUp)
router.post("/login",Login)

module.exports = router;