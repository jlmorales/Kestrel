const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true  
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    }

});

//pre function happpens before specified action
//before save we runn async function
// we check if password has been hashed
// we hash the password and assign
//then we move on to next middle ware which is saving this document
userSchema.pre("save", async function(next){
    try{
        if(!this.isModified("password")){
            return next();
        }
        let hashedPassword = await bcrypt.hash(this.password, 20);// salt the hash 
        this.password = hashedPassword;
        return next();
    }catch(err){
        return next(err);//send to error handler
    }
});

//we can use this password to compare password from user to saved password
userSchema.method.comparePassword = async function(candidatePassword, next){
    try{
        let doesMatch = await bcrypt.compare(candidatePassword, this.password);
        return doesMatch
    }
    catch(err){
        return next(err);
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User