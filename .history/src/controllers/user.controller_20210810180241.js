const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require('../models/user.model');

const HttpException = require('../utils/HttpException.utils');
import userModel from '../models/user.model';
import { AuthService } from '../services/authService'

class UserController {
    // getAllUser = async (req, res, next) => {

    //     let userList = await UserModel.find();

    //     if (!userList.length) {
    //         throw new HttpException(404, 'Users not found');
    //     }

    //     userList = userList.map(user => {
    //         const { password, ...userWithoutPassword } = user;
    //         return userWithoutPassword;
    //     });

    //     res.send(userList);
    // };
    static userLogin = async (req, res) => {
        // const data = { ...req.body };
        // console.log(data)
        const resultUserLogin = await AuthService.userLogin({ ...req.body });

        return res.json(resultUserLogin);
    };
    registerUser = async (req, res, next) => {
        const data = { ...req.body }

        const resultUserRegister = await AuthService.userRegister(data)

        return res.json(resultUserRegister)
    };
    getUserById = async (req, res, next) => {
        const user = await UserModel.findByUserID({ ID_tai_khoan: req.params.ID_tai_khoan });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    };
    getUserByUserName = async (req, res, next) => {
        const user = await UserModel.findByUserName({ user_name: req.params.user_name });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    };
    getUserByRole = async (req, res, next) => {
        const user = await UserModel.findByRole({ role: req.params.role });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    };
    getUserByActived = async (req, res, next) => {

        const user = await UserModel.findByActived({ actived: req.params.actived });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    };

    deleteByUserID = async (req, res, next) => {
        const { ID_tai_khoan } = req.params.ID_tai_khoan;
        const result = await UserModel.deleteByID({ ID_tai_khoan: req.params.ID_tai_khoan });
        if (!result) {
            throw new HttpException(404, 'User not found');
        }
        res.send('User has been deleted');
    };
    deleteByUserName = async (req, res, next) => {
        const result = await UserModel.deleteByUserName(req.params.user_name);
        if (!result) {
            throw new HttpException(404, 'User not found');
        }
        res.send('User has been deleted');
    };


}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new UserController;