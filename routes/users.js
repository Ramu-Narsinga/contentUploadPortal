var express = require('express');
var router = express.Router();

console.log("router is initialized");

// Require controller modules.
var portal_content = require('../controllers/portalContentController.js');

/* POST users listing. */
router.post('/uploadUserContent', portal_content.save_portal_content);

module.exports = router;
