const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const mainController = require("../controllers/main");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, mainController.getProfile);
router.get("/medicineReminders", ensureAuth, mainController.getMedicineReminders);
router.post("/addMeds", ensureAuth, mainController.addMeds);
router.put("/addTaken/:id", ensureAuth, mainController.addTaken);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
