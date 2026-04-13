import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    // Basic Info
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
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    address: {
      type: String,
    },

    isProvider: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["user", "provider"],
      default: "user",
    },
    servicesOffered: [
      {
        type: String,
      },
    ],

    experience: {
      type: Number,
    },

    aadhaarNumber: {
      type: String,
    },

    aadhaarFrontPhoto: {
      type: String,
    },

    aadhaarBackPhoto: {
      type: String,
    },

    adminVerified: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Approved", "Rejected", "Blocked"]
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    walletBalance: {
      type: Number,
      default: 0,
    },
    device_token: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User