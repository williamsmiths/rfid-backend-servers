import { errors, jsonError, jsonSuccess } from '../utils/system'
import { hashPassword, comparePassword } from '../utils/encryption'
import { generateUserToken, generateCode } from '../utils/commonFunctions'
import { SendEmail } from '../utils/email'
// import { RedisCommon } from '../utils/redis'
const UserModel = require('../models/user.model');

const Sentry = require('@sentry/node')


class AuthService {
  // static async boot() {
  //   try {
  //     const numberOfAdmin = await Admin.countDocuments()

  //     if (!numberOfAdmin) {
  //       const passwordWithHash = await hashPassword(getEnv('DEFAULT_SUPER_ADMIN_PASSWORD'))
  //       if (!passwordWithHash) return jsonError(errors.HASH_PASSWORD_ERROR)

  //       const newAdmin = new Admin({
  //         username: getEnv('SUPER_ADMIN_USERNAME'),
  //         password: passwordWithHash.result
  //       })
  //       await newAdmin.save()
  //     }
  //   } catch (error) {
  //     console.error(`TIME: ${new Date()}-- AUTH_BOOT: ${error}`)
  //     Sentry.captureException(error)
  //     return jsonError(error.SYSTEM_ERROR)
  //   }
  // }

  static userRegister = async ({
    user_name,
    password,
    display_name,
    role,
    address,
    actived,
  }) => {
    try {
      const user = await UserModel.findByUserName({ user_name });
      
      if (user.length) return jsonError(errors.USERNAME_EXISTED_ERROR);

      // const display_name = await UserModel.findOneDislayName({ display_name });
      // if (display_name) return jsonError(errors.DISPLAY_NAME_EXISTED_ERROR);

      // console.log("display name", display_name);

      // console.log("user password: ", password);

      const passwordWithHash = await hashPassword(password);
      if (!passwordWithHash) return jsonError(errors.HASH_PASSWORD_ERROR);

      var m = new Date();

      var dateString =
        m.getUTCFullYear() +
        "/" +
        ("0" + (m.getUTCMonth() + 1)).slice(-2) +
        "/" +
        ("0" + m.getUTCDate()).slice(-2) +
        " " +
        ("0" + m.getUTCHours()).slice(-2) +
        ":" +
        ("0" + m.getUTCMinutes()).slice(-2) +
        ":" +
        ("0" + m.getUTCSeconds()).slice(-2);

      const created = dateString;
      const updated = dateString;

      password = passwordWithHash.result.hash;
      const salt = passwordWithHash.result.salt;

      const newUser = await UserModel.create({
        user_name,
        password,
        salt,
        display_name,
        role,
        address,
        actived,
        created,
        updated,
      });
      if (!newUser) {
        throw new HttpException(500, "Something went wrong");
      }
      console.log(newUser);
      return jsonSuccess(newUser);
    } catch (error) {
      console.error(`TIME: ${new Date()}-- USER_REGISTER: ${error}`);
      Sentry.captureException(error);
      return jsonError(errors.SYSTEM_ERROR);
    }
  };
  // static verifyRegister = async ({ email, codeActive }) => {
  //   try {
  //     const user = await User.findOne({ email })
  //     if (user === null) return jsonError(errors.USER_NOT_FOUND)

  //     const yourCode = await RedisCommon.getValue(email)

  //     if (!yourCode) return jsonError(errors.CODE_CONFIRM_NOT_EXIST)

  //     if (yourCode !== codeActive) return jsonError(errors.CODE_CONFIRM_IN_CORRECT)

  //     await User.findOneAndUpdate({ email }, { $set: { active: true } })
  //     await RedisCommon.deleteKey(email)

  //     const tokenData = {
  //       id: user._id
  //     }

  //     const token = await generateUserToken(tokenData)
  //     if (!token) return jsonError(errors.TOKEN_GENERATED_FAILURE)

  //     return jsonSuccess({ token })
  //   } catch (error) {
  //     console.error(`TIME: ${new Date()}-- VERIFY_REGISTER: ${error}`)
  //     Sentry.captureException(error)
  //     return jsonError(errors.SYSTEM_ERROR)
  //   }
  // }

  // static getNewCode = async ({ email }) => {
  //   try {
  //     const user = await User.findOne({ email })
  //     if (user === null) return jsonError(errors.USER_NOT_FOUND)

  //     const code = generateCode(6)
  //     const sendEmailResult = await SendEmail.register(email, code)
  //     if (sendEmailResult === false) return jsonError(errors.SEND_MAIL_VERIFY_ERROR)

  //     await RedisCommon.setValue(email, code)

  //     return jsonSuccess()
  //   } catch (error) {
  //     console.error(`TIME: ${new Date()}-- GET_NEW_CODE: ${error}`)
  //     Sentry.captureException(error)
  //     return jsonError(errors.SYSTEM_ERROR)
  //   }
  // }

  static userLogin = async ({ user_name, password }) => {
    try {
      const user = await UserModel.findByUserName({ user_name });
      if (!user.length) return jsonError(errors.USER_NOT_FOUND);
      const dbPassword = user[0].password;
      const resultComparePass = await comparePassword(password, dbPassword);
      if (!resultComparePass.success) return jsonError(errors.SYSTEM_ERROR);
      if (!resultComparePass.result)
        return jsonError(errors.WRONG_PASSWORD_ERROR);
      // if (user.block) return jsonError(errors.ACCOUNT_IS_LOCKED);
      if (user[0].actived != 0) return jsonError(errors.ACCOUNT_IS_NOT_ACTIVATED);
      const tokenData = {
        id: user[0].ID_tai_khoan,
        role: user[0].role,
        user_name: user[0].user_name,
      };
      const token = await generateUserToken(tokenData);
      if (!token) return jsonError(errors.TOKEN_GENERATED_FAILURE);
      return jsonSuccess({ token });
    } catch (error) {
      console.error(`TIME: ${new Date()}-- USER_LOGIN: ${error}`);
      Sentry.captureException(error);
      return jsonError(errors.SYSTEM_ERROR);
    }
  };

  // static Adminlogin = async ({ username, password }) => {
  //   try {
  //     const admin = await Admin.findOne({ username }).select('password')
  //     if (!admin) return jsonError(errors.ADMIN_NOT_FOUND)

  //     const dbPassword = admin.password
  //     const resultComparePass = await comparePassword(password, dbPassword)

  //     if (!resultComparePass.success) return jsonError(errors.SYSTEM_ERROR)
  //     if (!resultComparePass.result) return jsonError(errors.WRONG_PASSWORD_ERROR)

  //     const tokenData = {
  //       id: admin._id
  //     }
  //     const token = await generateUserToken(tokenData)
  //     if (!token) return jsonError(errors.TOKEN_GENERATED_FAILURE)

  //     return jsonSuccess({ token })
  //   } catch (error) {
  //     console.error(`TIME: ${new Date()}-- ADMIN_LOGIN: ${error}`)
  //     Sentry.captureException(error)
  //     return jsonError(errors.SYSTEM_ERROR)
  //   }
  // }
}

export { AuthService }
