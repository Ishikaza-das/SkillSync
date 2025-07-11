const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    phonenumber: {type:Number,required:true},
    password: {type:String, required:true},
    role: {type:String, enum:['candidates','recruiters'],required:true},
    profile: {
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumename: {type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'},
        profilephoto:{type:String,default:''}
    },
},{timestamps:true});

module.exports = mongoose.model('User',userSchema);