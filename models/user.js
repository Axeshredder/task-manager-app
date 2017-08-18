var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var schema = mongoose.Schema;

var userSchema = new schema({
    email:{type:String,required:true},
    password:{type:String,required:true}
});

userSchema.methods.encrypt = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
};

userSchema.methods.valid= function(password){
    return bcrypt.compareSync(password,this.password);
}

module.exports= mongoose.model('User',userSchema);