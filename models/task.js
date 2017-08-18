var mongoose = require('mongoose');
var schema = mongoose.Schema;

var taskSchema = new schema({
    title:{type:String,required:true},
    description:{type:String,required:true}
});

module.exports = mongoose.model('Task',taskSchema);