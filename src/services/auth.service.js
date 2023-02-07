const { AppError } = require("../helpers/error");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/jwt");

const login = async (credentials) => {
  try {
    const { userName, password } = credentials;
    const user = await User.findOne({
      where: { userName },
      attributes: { include: ["password"] },
    });
    console.log("user", user);
    if (!user) {
      throw new AppError(400, "userName or password invalid");
    }

    const isMatched = bcrypt.compareSync(password, user.password);
    if (!isMatched) {
      throw new AppError(400, "userName or password invalid");
    }

    // delete user.dataValues.password;
    // return user;
    return generateToken(user);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  login,
};
