var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');

// *** upload related code
var dir = path.win32.dirname(__dirname);
var uploadsDir = dir + '/uploads';

function makeDirectory() {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

  } catch (err) {
    if (err.code !== 'EEXIST')
      throw err;
  } // try-catch
}

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '/uploads')
  },
  filename: function(req, file, cb) {
    console.log("in filename cb", file);
    cb(null, file.originalname + '-' + Date.now())
  }
});

console.log("router is initialized");

// Require controller modules.
var portal_content = require('../controllers/portalContentController.js');

/* POST users listing. */
router.post('/uploadUserContent', portal_content.save_portal_content);

router.post('/formupload', portal_content.upload_file);
//above two routes are for file upload and saving uploaded details

//get content Uploaded
// router.get('/generic/getContentUploaded', portal_content.get_content_uploaded);

//get uploaded content
router.get('/admin/getContentUploaded', portal_content.get_content_uploaded);

//get one by id for populating generic template
router.get('/admin/:id/edit', portal_content.get_one_content);

//get one by id for populating generic template
router.put('/admin/:id/edit', portal_content.update_one_content);

//delete on card content
router.delete('/admin/:id/deleteOneCardContent', portal_content.delete_one_content);

module.exports = router;
