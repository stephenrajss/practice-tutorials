import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Profile from "../model/profile.js";

export async function userRegister(body) {
  const { userName, email, password, number } = body.values;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const loginData = await Profile.findOne({ email: email }).lean();

    if (!loginData && loginData === null) {
      const userRegisterData = new Profile({
        userName: userName,
        email: email,
        password: hashPassword,
        number: number,
      });
      const userLoginData = await userRegisterData.save();

      if (userLoginData) {
        return { success: true, message: "User registered succesfully." };
      } else {
        return { success: false, message: "User registered failed." };
      }
    } else {
      return { success: false, message: "loginData not found..." };
    }
  } catch (error) {
    console.error("catch error::::", error);
    return { success: false, error: error.message };
  }
}

export const userLogin = async (body) => {
  const { email, password } = body.values;

  try {
    const loginInfo = await Profile.findOne({ email: email }).lean();

    if (loginInfo?.email !== email) {
      return { success: false, message: "Entered email is wrong..." };
    }

    const passwordMatch = await bcrypt.compare(password, loginInfo.password);

    if (!passwordMatch) {
      return { success: false, message: "Password is incorrect" };
    }

    const generatedNewToken = jwt.sign(
      {
        sub: loginInfo._id,
      },
      "stephen",
      {
        expiresIn: "10d",
      }
    );

    if (generatedNewToken) {
      const updateUserDoc = await Profile.updateOne(
        { email: loginInfo.email },
        { $push: { token: generatedNewToken } }
      );

      if (updateUserDoc.modifiedCount === 1) {
        return {
          success: true,
          message: "User Token is not updated in userData",
          data: {
            token: generatedNewToken,
            id: loginInfo._id,
            userName: loginInfo.userName,
            email: loginInfo.email,
          },
          message: "logged in successfully",
        };
      } else {
        return {
          success: false,
          message: "User Token is not updated in userData",
        };
      }
    }
  } catch (error) {
    console.error("userLogin catch error ::", error);
    return `userLogin catch error :: ${error.message}`;
  }
};
