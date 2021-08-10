const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ScannerModel = require('../models/scanner.model');
const HttpException = require('../utils/HttpException.utils');
import { AuthService } from '../services/authService'

class ScannerController {
    getAllScanner = async (req, res, next) => {

        let scannerList = await ScannerModel.find();
        if (!scannerList.length) {
            throw new HttpException(404, 'Product not found');
        }

        res.send(scannerList);
    };

    getByID = async (req, res, next) => {

        const scanner = await ScannerModel.findByID(req.params.ID_lich_su_quet);
        if (!scanner) {
            throw new HttpException(404, 'Scanner not found');
        }

        res.send(scanner);
    };

    get_OneTram_AllDay = async (req, res,next) => {
        const { che_do_may_quet, ID_thiet_bi, ds_vi_tri_quet } = { ...req.body };
        const resultScannerTram = await ScannerModel.find_OneTram_AllDay({ che_do_may_quet,ID_thiet_bi,ds_vi_tri_quet });
        if (!resultScannerTram.length) {
            throw new HttpException(404, 'Scanner not found');
        } 
        return res.send(resultScannerTram);
    };
    get_CamTay_AllDay = async (req, res,next) => {
        const data = { ...req.body };
        console.log(data)
        const resultScanner = await ScannerModel.find_CamTay_AllDay(data);
        if (!resultScanner.length) {
            throw new HttpException(404, 'Scanner not found');
        } 
        return res.send(resultScanner);
    };
   
    deleteByID = async (req, res, next) => {
        const result = await ScannerModel.deleteByID(req.params.ID_lich_su_quet);
        if (!result) {
            throw new HttpException(404, 'Scanner not found');
        }
        res.send('The scanner has been deleted');
    };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
 module.exports = new ScannerController;