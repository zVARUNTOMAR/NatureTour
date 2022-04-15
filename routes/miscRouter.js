const express = require('express');

const router = express.Router();
const miscController = require('../controllers/miscController');

// router.param('id', tourController.checkId);
router.route('/get-questions').get(miscController.getAllQuestions);

module.exports = router;
