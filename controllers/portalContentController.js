var portalContentModel = require("../models/uploadContent")
var fs = require('fs');
var path = require('path');

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

//for file upload
exports.upload_file = function(req, res) {
  console.log("req.body", req.body, "req.file", req.file);

  res.send("file uploaded");
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
