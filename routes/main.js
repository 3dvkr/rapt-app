const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const timersController = require("../controllers/timers")
const guestController = require("../controllers/guest")

const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureGuest, homeController.hello);

router.get('/main', ensureAuth, timersController.workSession)
router.get('/today', ensureAuth, timersController.getTodaysTimers)
router.get('/history', ensureAuth, timersController.getHistory)
router.post('/main', ensureAuth, timersController.postWorkSession)
router.patch('/update/:id', ensureAuth, timersController.updateWorkSession)
router.delete('/delete/:id', ensureAuth, timersController.deleteWorkSession)


router.get("/login", ensureGuest, authController.getLogin);
router.post("/login", ensureGuest, authController.postLogin);


router.get("/signup", ensureGuest, authController.getSignup);
router.post("/signup", ensureGuest, authController.postSignup);

router.get("/timer", ensureGuest, guestController.getTimer)

router.get("/logout", authController.logout);

module.exports = router;
