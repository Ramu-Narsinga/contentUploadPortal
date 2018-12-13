//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var PortalContentSchema = new Schema({
    uploaded_file_name: {type: String, required: true, max: 100},
    district: {type: String, required: true, max: 100},
    assembly_constituency: {type: String, required: true, max: 100},
    parliament_constituency: {type: String, required:true,max: 100},
    tags: [String],
    comment: {type: String}
});

//Export function to create "PortalContentSchema" model class
module.exports = mongoose.model('PortalContentSchema', PortalContentSchema );
