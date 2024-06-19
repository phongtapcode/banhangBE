const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const JwtService = require("./JwtService");
const EmailService = require("../services/EmailService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, phone } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });

      if (checkUser !== null) {
        resolve({
          status: "ERR",
          message: "Email đã tồn tại",
        });
      }
      // Tạo mã hóa password
      const hashPassword = bcrypt.hashSync(password, 10);

      const createdUser = await User.create({
        name,
        email,
        password: hashPassword,
        phone,
      });
      if (createdUser) {
        resolve({
          status: "OK",
          message: "Tạo thành công",
          data: createUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const {email, password} = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });

      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "Tài khoản không tồn tại",
        });
      }

      const comparePassword = bcrypt.compareSync(password, checkUser.password);

      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "Mật khẩu hoặc Email không chính xác"
        });
      }

      const access_token = await JwtService.genneralAccessToken({
          id: checkUser.id,
          isAdmin: checkUser.isAdmin
        })

        const refresh_token = await JwtService.genneralRefreshToken({
          id: checkUser.id,
          isAdmin: checkUser.isAdmin
        })

      resolve({
        status: "OK",
        message: "Đăng nhập thành công",
        access_token,
        refresh_token
      })
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (id,data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({_id:id});

      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }

      const updatedUser = await User.findByIdAndUpdate(id,data,{new: true});

      return resolve({
        status: "OK",
        message: "Cập nhật thành công",
        data: updatedUser
      })
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({_id:id});

      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "Không có người dùng",
        });
      }

      const deletedUser = await User.findByIdAndDelete(id);

      return resolve({
        status: "OK",
        message: "Xóa thành công"
      })
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find({isAdmin: false});

      return resolve({
        status: "OK",
        message: "All User",
        data: allUser
      })
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({_id:id});

      return resolve({
        status: "OK",
        message: "DetailUser",
        data: checkUser
      })
    } catch (e) {
      reject(e);
    }
  });
};

const forgetPassword = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "Email không tồn tại",
        });
      }

      const token = uuidv4();
      
      await EmailService.sendEmailChangePassword(email,token);

      return resolve({
        status: "OK",
        message: "Vui lòng vào email để đổi mật khẩu"
      })

    } catch (e) {
      reject(e);
    }
  });
};

const resetPassword = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {token,email,password} = data;

      if(!token || !email || !password){
          resolve({
          status: "ERR",
          message: "Vui lòng thực hiện đúng bước"
        })
      }

      const hashPassword = bcrypt.hashSync(password, 10);
      const updatedPassword = await User.findOneAndUpdate({email: email},{password: hashPassword})

      return resolve({
        status: "OK",
        message: "Mật khẩu đã được đổi thành công",
      })

    } catch (e) {
      reject(e);
    }
  });
};

const getAllUserFilter = (month) => {
  return new Promise(async (resolve, reject) => {
    try {
      var users = [];

      if(month !== "no"){
        const startDate = new Date(`${month}-01T00:00:00Z`);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
        endDate.setUTCHours(0, 0, 0, -1);
        users = await User.find({
          createdAt: { $gte: startDate, $lte: endDate },
        })
        
      }else{
        users = await User.find();
      }

      return resolve({
        status: "OK",
        message: "All User",
        data: users
      })
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  forgetPassword,
  resetPassword,
  getAllUserFilter
};
