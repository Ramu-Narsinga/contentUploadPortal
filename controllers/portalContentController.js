var portalContentModel = require("../models/uploadContent")
var fs = require('fs');
var path = require('path');
var multer = require('multer');

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

  destination: function(req, file, callback) {
    makeDirectory();
    callback(null, uploadsDir)
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});

var allowedFileFormats = [".png", ".jpg", ".gif", ".jpeg", ".webm", ".mp4", ".ogg"]

// define nulter object one time
var upload = multer({
  storage: storage,
  fileFilter: function(req, file, callback) {
    console.log("multer upload file info: " + JSON.stringify(file));

    var ext = path.extname(file.originalname);
    if (ext != null)
      ext = ext.toLowerCase();

    console.log("extension is", ext);

    if (allowedFileFormats.indexOf(ext) == -1) {
      callback('File format/extension ' + ext + ' is not valid', false);
    } else {
      callback(null, true);
    }
  }
}).single('file');

//for saving form details into mongodb
exports.save_portal_content = function(req, res) {

  console.log("in save portal content stringify", req.body);
  // create the instance of the model and then save it
  var portal_content_instance = new portalContentModel({
    uploaded_file_name: req.body.uploaded_file_name,
    district: req.body.district,
    assembly_constituency: req.body.assembly_constituency,
    parliament_constituency: req.body.parliament_constituency,
    tags: req.body.tags,
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
  upload(req, res, function(err) {
    if (err) {
      console.log("Error while uploading file: ", err);
      res.send("Error while uploading file: " + err);
    } else {
      //if body is empty it means that no file is chosen and don't redirect rather send meaningful response
      console.log("Done with uploading file");

      setTimeout(myFunction, 3000);


      function myFunction() {
        res.redirect("/");
      }
    }
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

//get selected/editable content
exports.get_one_content = function(req, res) {
  console.log("req.params", req.params);
  portalContentModel.findOne({
      _id: req.params.id
    })
    .sort([
      ['name', 'ascending']
    ])
    .exec(function(err, list) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      //res.render('genre_list', { title: 'Genre List', genre_list: list_genres });
      //res.json(list)
      //console.log("this is list from getOne" + list);
      res.json(list);
    });
}

//update selected/edited content
exports.update_one_content = function(req, res) {
  console.log("what's in req.params, req.body really", req.params, req.body);
  portalContentModel.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        "uploaded_file_name": req.body.uploaded_file_name,
        "district": req.body.district,
        "assembly_constituency": req.body.assembly_constituency,
        "parliament_constituency": req.body.parliament_constituency,
        "tags": req.body.tags,
        "comment": req.body.comment
      }
    }, {new: true})
    .exec(function(err, list) {
      if (err) {
        return next(err);
      }
      console.log("successfully updated");
      res.json(list);
    });
}

//delete selected content
exports.delete_one_content = function(req, res) {
  console.log("what's in req.params for delete", req.params);
  portalContentModel.remove({
      _id: req.params.id
    })
    .exec(function(err, result) {
      if (err) {
        return next(err);
      }
      console.log("successfully deleted one card content", result);
      res.json(result);
    })
}
