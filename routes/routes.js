const express = require('express');
const path = require('path');

const controller = require('../controller.js');

const router = express.Router();


router.get("/new-student", controller.getFormNewStudent);
router.post("/new-student", controller.insertNewStudent);
router.get("/get-character-sheet", controller.getFormFindCharacterSheet);
router.post("/find-character-sheet", controller.findCharacterSheet);
//router.get("/get-data-student", controller.getFormFindDataStudent);
router.post("/find-data-student", controller.findDataStudent);
router.put("/update-data-student", controller.updateStudent);

router.get("/login", controller.login);
router.post("/login", controller.checkLogin);

router.get("/get-data-students", controller.getDataStudents);

module.exports = router;