var portalContentModel = require("../models/uploadContent")

exports.save_portal_content = function(req, res) {
  console.log("in save portal content stringify",req.body);
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
