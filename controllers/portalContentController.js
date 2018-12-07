var portalContentModel = require("../models/uploadContent")
var formidable = require('formidable');
var fs = require('fs');

//for saving form details into mongodb
exports.save_portal_content = function(req, res) {

  console.log("in save portal content stringify", req.body);
  // create the instance of the model and then save it
  var portal_content_instance = new portalContentModel({
    uploaded_file_name: req.body.UploadedfileName,
    district: req.body.district,
    constituency: req.body.constituency,
    tags: [req.body.constituency],
    comment: req.body.comment
  });

  portal_content_instance.save(req.body, function(err, result) {
    if (err)
      console.log("error while saving in mongodb", err);
    else {
      res.send("in save portal content, after save succes call back");
    }
  });
}

//for file file upload
exports.upload_file = function(req, res) {
  console.log("upload file in controller", req.body);

  // Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
  fs.mkdir('/tmp/a/apple', {
    recursive: true
  }, (err) => {
    if (err) throw err;
  });

  var form = new formidable.IncomingForm();

  //form parse code
  form.parse(req, function(err, fields, files) {
    console.log("what's in files", files);
    res.redirect('/');
    res.end();
  });
}

//to get all content uploaded details from mongodb
exports.get_content_uploaded = function(req, res) {
  console.log("in get all content uploaded function");
  portalContentModel.find()
    .sort([
      ['name', 'ascending']
    ])
    .exec(function(err, list) {
      if (err) {
        return next(err);
      }
      console.log("this is list from get details" + list);
      res.json(list);
    });
}
