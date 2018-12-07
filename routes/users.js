var express = require('express');
var router = express.Router();

console.log("router is initialized");

// Require controller modules.
var portal_content = require('../controllers/portalContentController.js');

/* POST users listing. */
router.post('/uploadUserContent', portal_content.save_portal_content);

router.post('/formupload', portal_content.upload_file);
//above two routes are for file upload and saving uploaded details

//get content Uploaded
router.get('/generic/getContentUploaded', portal_content.get_content_uploaded);

module.exports = router;
