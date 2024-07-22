import { userRegister, userLogin } from "../service/login.js";

export const registerController = async (req, res) => {
  try {
    const result = await userRegister(req.body);
    res.send({
      status: result.success,
      message: result.message,
      // data: result.data,
    });
  } catch (error) {
    res.status(403).send({ status: false, error });
  }
};

export const loginController = async (req, res) => {
  try {
    const result = await userLogin(req.body);
    res.send({
      status: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    res.status(403).send({ status: false, error });
  }
};
