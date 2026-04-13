import { hashPassWord } from "../../Helpers/hashPassWord.js";
import { JWTtoken } from "../../Helpers/JWTtoken.js";
import User from "../../Models/userModel.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      gender,
      address,
      isProvider,
      servicesOffered,
      experience,
      aadhaarNumber,
    } = req.body;
    const aadhaarFrontPhoto = req.files?.aadhaarFrontPhoto?.[0]?.path;
    const aadhaarBackPhoto = req.files?.aadhaarBackPhoto?.[0]?.path;

    let errors = [];

    const fields = {
      name,
      email,
      password,
      phone,
      gender,
      address,
      isProvider,
    };

    Object.keys(fields).forEach(f => {
      const value = fields[f];
      if (!value && value !== false) {
        errors.push(f);
      }
    });

    if (isProvider) {
      if (!servicesOffered) errors.push("servicesOffered");
      if (!experience) errors.push("experience");
      if (!aadhaarNumber) errors.push("aadhaarNumber");
      if (!aadhaarFrontPhoto) errors.push("aadhaarFrontPhoto");
      if (!aadhaarBackPhoto) errors.push("aadhaarBackPhoto");
    }

    if (errors.length > 0) {
      return res.send({
        status: false,
        message: "Validation Error",
        errors,
      });
    }

    const checkUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (checkUser) {
      return res.send({
        status: false,
        message: "User Already Exists Please Login",
      });
    }

    const responseHashPassword = await hashPassWord(password);

    if (!responseHashPassword.status) {
      return res.send({
        status: false,
        message: "Hash Error While Hashing Password",
      });
    }

    const newUserData = {
      name,
      email,
      phone,
      password: responseHashPassword.hashed,
      gender,
      address,
      isProvider,
    };

    if (isProvider) {
      newUserData.servicesOffered = servicesOffered;
      newUserData.experience = experience;
      newUserData.aadhaarNumber = aadhaarNumber;
      newUserData.aadhaarFrontPhoto = aadhaarFrontPhoto;
      newUserData.aadhaarBackPhoto = aadhaarBackPhoto;
      newUserData.adminVerified = "Pending";
    }

    const newUser = await User.create(newUserData);

    if (!newUser) {
      return res.send({
        status: false,
        message: "New User Creation Failed",
      });
    }

    const token = await JWTtoken(newUser._id);

    return res.send({
      status: true,
      message: `${isProvider ? "Provider" : "User"} Created Successfully`,
      token,
    });

  } catch (error) {
    console.log("USER SIGNUP CONTROLLER ERROR", error);
    return res.send({
      status: false,
      message: error.message || "New User Creation Failed",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!email || !password) {
      return res.send({
        status: false,
        message: "Email and Password are required"
      });
    }
    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res.send({
        status: false,
        message: 'User Not Found Please Register First',
      });
    }

    const matchPassWord = await bcrypt.compare(password, checkUser.password)

    if (!matchPassWord) {
      return res.send({
        status: false,
        message: 'Incorrect Credentials',
      });
    }
    const token = await JWTtoken(checkUser._id)
    return res.send({
      status: true,
      message: `${checkUser?.isProvider ? "Provider" : "User"} Logged In Successfully`,
      token: token
    });


  } catch (error) {
    console.log("USER LOGIN CONTROLLER ERROR", error)
    return res.send({
      status: false,
      message: error.message,
    });
  }
}

export const getProfile = async (req, res) => {
  try {
    const id = req.userId;
    const checkUser = await User.findById(id).select("-password -createdAt -updatedAt");
    if (!checkUser) {
      return res.send({
        status: false,
        message: "User Profile Not Found",
      });
    }
    const userObj = checkUser.toObject();
    const isProvider = userObj.isProvider;
    let accountActive = true;
    if (isProvider) {
      accountActive = userObj.adminVerified === "Approved";
    }
    if (!isProvider) {
      delete userObj.adminVerified
      delete userObj.servicesOffered
    }

    if (isProvider && !accountActive) {
      let message = "";
      switch (userObj.adminVerified) {
        case "Pending":
          message = "Profile is not approved by the admin";
          break;
        case "Rejected":
          message = "Profile is rejected by the admin";
          break;
        case "Blocked":
          message = "Profile is blocked by the admin";
          break;
      }



      return res.send({
        status: false,
        message,
        accountStatus: userObj.adminVerified,
        user: userObj,
      });
    }


    return res.send({
      status: true,
      message: "User Profile Fetched Successfully",
      user: userObj,
    });

  } catch (error) {
    console.log("USER GET PROFILE CONTROLLER ERROR", error);

    return res.send({
      status: false,
      message: error.message || "Something went wrong",
    });
  }
};