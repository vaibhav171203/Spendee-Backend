// import User from "../models/UserSchema.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";
// import path from "path";
// import dotenv from "dotenv";

// dotenv.config({ path: "./config.env" });
// export const registerControllers = async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;

//     //  console.log(name, email, password);

//     if (!name || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Please enter All Fields",
//       });
//     }

//     let user = await User.findOne({ email });

//     if (user) {
//       return res.status(409).json({
//         success: false,
//         message: "User already Exists",
//       });
//     }

//     const salt = await bcrypt.genSalt(10);

//     const hashedPassword = await bcrypt.hash(password, salt);

//     // console.log(hashedPassword);

//     let newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });
//     // const token = JWT.sign({ id: user._id }, JWTSecret);

//     return res.status(200).json({
//       success: true,
//       message: "User Created Successfully",
//       user: newUser,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
// export const loginControllers = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     // console.log(email, password);

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Please enter All Fields",
//       });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Incorrect Email or Password",
//       });
//     }

//     delete user.password;

//     return res.status(200).json({
//       success: true,
//       message: `Welcome back, ${user.name}`,
//       user,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// export const setAvatarController = async (req, res, next) => {
//   try {
//     const userId = req.params.id;

//     const imageData = req.body.image;

//     const userData = await User.findByIdAndUpdate(
//       userId,
//       {
//         isAvatarImageSet: true,
//         avatarImage: imageData,
//       },
//       { new: true }
//     );

//     return res.status(200).json({
//       isSet: userData.isAvatarImageSet,
//       image: userData.avatarImage,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// export const allUsers = async (req, res, next) => {
//   try {
//     const user = await User.find({ _id: { $ne: req.params.id } }).select([
//       "email",
//       "username",
//       "avatarImage",
//       "_id",
//     ]);

//     return res.json(user);
//   } catch (err) {
//     next(err);
//   }
// };

// const JWT_SECRET = "YOUR-RANDOM-SHIIT"; // Make sure to use a secure and unique secret
// const EMAIL_USER = process.env.EMAIL; // Replace with your email
// const EMAIL_PASS = process.env.APP_PASSWORD; // Replace with your email password

// export const forgotPasswordController = async (req, res, next) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: "Please enter an email address",
//       });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       //port: 587, // Hardcode It
//         //secure: false, 
//       auth: {
//         user: EMAIL_USER,
//         pass: EMAIL_PASS,
//       },
      
      
//     });
//     console.log({EMAIL_PASS}, {EMAIL_USER});

//     const mailOptions = {
//       from: EMAIL_USER,
//       to: user.email,
//       subject: "Password Reset Request",
//       text: `You requested a password reset. Please click on the following link to reset your password: 
//             http://http://localhost:3000/resetPassword/${token}`,
//     };

//     await transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log(error);
//         return res.status(500).json({
//           success: false,
//           message: "Error sending email",
//           error,
//         });
//       } else {
//         return res.status(200).json({
//           success: true,
//           message: "Password reset email sent successfully",
//         });
//       }
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// export const resetPasswordController = async (req, res, next) => {
//   try {
//     const { token, password } = req.body;

//     if (!token || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide a token and a new password",
//       });
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);

//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     user.password = hashedPassword;
//     await user.save();

//     return res.status(200).json({
//       success: true,
//       message: "Password reset successfully",
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };


import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const JWT_SECRET = process.env.JWT_SECRET; // Make sure to use a secure and unique secret
const EMAIL_USER = process.env.EMAIL; // Replace with your email
const EMAIL_PASS = process.env.APP_PASSWORD; // Replace with your email password

export const registerControllers = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter All Fields",
      });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already Exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
      user: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const loginControllers = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter All Fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Email or Password",
      });
    }

    delete user.password;

    return res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}`,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const setAvatarController = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const imageData = req.body.image;

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage: imageData,
      },
      { new: true }
    );

    return res.status(200).json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (err) {
    next(err);
  }
};

export const allUsers = async (req, res, next) => {
  try {
    const user = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);

    return res.json(user);
  } catch (err) {
    next(err);
  }
};

export const forgotPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter an email address",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Please click on the following link to reset your password: 
            http://localhost:3000/resetPassword/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Error sending email",
          error,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Password reset email sent successfully",
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const resetPasswordController = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide a token and a new password",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Password reset token is invalid or has expired",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
