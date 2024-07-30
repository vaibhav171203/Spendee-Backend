import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const bcryptSalt = process.env.BCRYPT_SALT;

// User Schema Model - (Name, email, password, creation Date) with validation rules
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique : true,
        validate : validator.isEmail,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength : [6, "Password Must Be Atleast 6 characters"],
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },

    avatarImage: {
        type: String,
        default: ""
    },
    transactions: {
        type: [],
    },

    createdAt: {
        type:Date,
        default: Date.now,
    },
    resetPasswordToken: String,
  resetPasswordExpires: Date,

    

});

// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//       return next();
//     }
//     const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
//     this.password = hash;
//     next();
//   });

const User = mongoose.model("User", userSchema);

export default  User;