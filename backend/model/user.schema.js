import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    phoneNumber: { type: String },
    rollNumber: { type: String },
    address: { type: String },
   

    
      role: { type: String, enum: ["student", "admin"], default: "student" },

    cartData: { type: Object, default: {} },

    // ✅ Seller payout info (optional for students)
    upiId: { type: String }, // For UPI payouts
    bankAccount: {
      accountNumber: { type: String },
      ifsc: { type: String },
      name: { type: String }
    }
  ,
      // ✅ OTP Verification fields
    otp: { type: Number },          // generated OTP
    otpExpires: { type: Date },     // expiry time (5 mins)
    isVerified: { type: Boolean, default: false } // after OTP verify
  ,
},

  {
    timestamps: true,
    minimize: false,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
