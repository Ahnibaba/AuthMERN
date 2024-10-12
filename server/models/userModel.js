const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function (email, password) {

    // validation
    if(!email || !password) {
      throw new Error("All fields are required")
    }
    if(!validator.isEmail(email)) {
        throw new Error("Email is not valid")
    }
    if(!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough")
    }

   const exists = await this.findOne({ email })

   if(exists) {
    throw new Error("Email already in use")
   }

   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(password, salt)

   const user = await this.create({email, password: hashedPassword})

   return user


}

// static login method
userSchema.statics.login = async function(email, password) {
    // validation
    if(!email || !password) {
        throw new Error("All fields are required")
    }

    const user = await this.findOne({ email })

   if(!user) {
    throw new Error("Incorrect email")
   }

   const matchPassword = await bcrypt.compare(password, user.password)

   if (!matchPassword) {
    throw new Error("Incorrect Password")
   }

   return user
 

}

const userModel = mongoose.models.User || mongoose.model("User", userSchema)

module.exports = userModel