import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../model/user.schema.js";
import genToken from "../config/token.js";
import { sendEmail } from "../config/sendmail.js";
dotenv.config();

// // ✅ SIGNUP
// export const signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password)
//       return res.status(400).json({ message: "Please fill all fields" });

//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword });

//     const token = await genToken(user._id);

//     res.cookie("one_cart", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "Lax",
//       maxAge: 10 * 24 * 60 * 60 * 1000
//     });

//     return res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email
//     });
//   } catch (error) {
//     console.error("Error in signup:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };



// ✅ SIGNUP WITH EMAIL VERIFICATION (OTP)
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
   // 2️⃣ Allow only NITJ students
    const nitjDomain = "@nitj.ac.in";
    if (!email.toLowerCase().endsWith(nitjDomain)) {
      return res.status(400).json({
        message: "Only NITJ students can register. Use your @nitj.ac.in email.",
      });
    }
    // check if user already exist
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    // generate hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // create user with OTP
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires: Date.now() + 5 * 60 * 1000, // otp valid for 5 mins
    });

    // send email
    const htmlTemplate = `
      <h2>Welcome to Campus Bazaar 🎉</h2>
      <p>Your OTP for verification is:</p>
      <h1>${otp}</h1>
      <p>This OTP will expire in <b>5 minutes</b>.</p>
    `;

    await sendEmail(email, "Verify your Email - Campus Bazaar", htmlTemplate);

    return res.status(201).json({ message: "OTP sent to email", userId: newUser._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const user = await User.findById(userId);

    if (!user) return res.status(400).json({ message: "User not found" });
      if (user.otp?.toString() !== otp.toString()) {
    return res.status(400).json({ message: "Invalid OTP" });
  }
    if (user.otpExpires < Date.now()) return res.status(400).json({ message: "OTP expired" });

    // after verification
    user.otp = undefined;
    user.otpExpires = undefined;
    user.isVerified = true;
    await user.save();

    res.json({ message: "Email verified successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};


// ✅ LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Please fill all fields" });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(400).json({ message: "User doesn't exist" });

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = await genToken(existingUser._id);

    res.cookie("one_cart", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 10 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email
    });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ GOOGLE LOGIN
export const googlelogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: "google_oauth"
      });
    }

    const token = await genToken(user._id);

    res.cookie("one_cart", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 10 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error("Error in Google login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ LOGOUT
export const logout = (req, res) => {
  res.clearCookie("one_cart");
  return res.status(200).json({ message: "Logout successful" });
};
