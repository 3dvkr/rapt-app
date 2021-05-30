const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const timersController = require("../controllers/timers")

const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", homeController.hello);

router.get('/main', ensureAuth, timersController.workSession)
router.get('/today', ensureAuth, timersController.getTodaysTimers)
router.get('/history', ensureAuth, timersController.getHistory)
router.post('/main', ensureAuth, timersController.postWorkSession)
router.patch('/update/:id', ensureAuth, timersController.updateWorkSession)


router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/logout", authController.logout);

router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
