const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ProductModel = require('../models/product.model');
const HttpException = require('../utils/HttpException.utils');
import { AuthService } from '../services/authService'

class ProductController {
    getAllProduct = async (req, res, next) => {

        let productList = await ProductModel.find();

        if (!productList.length) {
            throw new HttpException(404, 'Product not found');
        }

        res.send(productList);
    };

    getAllHasRFID = async (req, res, next) => {

        const product = await ProductModel.findAllHasRFID();

        if (!product.length) {
            throw new HttpException(404, 'Product not found');
        }

        res.send(product);
    };

    getAllNoRFID = async (req, res, next) => {

        const product = await ProductModel.findByNoRFID();

        if (!product) {
            throw new HttpException(404, 'Product not found');
        }

        res.send(product);
    };
    
    getByID = async (req, res, next) => {

        const product = await ProductModel.findByID({ ID_danh_muc_sp: req.params.ID_danh_muc_sp });
        if (!product) {
            throw new HttpException(404, 'Product not found');
        }

        res.send(product);
    };
    getByMaRFID = async (req, res, next) => {

        const product = await ProductModel.findByMaRFID({ma_RFID: req.params.ma_RFID} );

        if (!product) {
            throw new HttpException(404, 'Product not found');
        }

        res.send(product);
    };

    getByMaSp = async (req, res, next) => {
        const product = await ProductModel.findByMaSp({  ma_san_pham: req.params.ma_san_pham });
        if (!product) {
            throw new HttpException(404, 'Product not found');
        }

        res.send(product);
    };
    getByMaNhomSp = async (req, res, next) => {
        const product = await ProductModel.findByMaNhomSp({  ma_nhom_sp: req.params.ma_nhom_sp });
        if (!product) {
            throw new HttpException(404, 'Product not found');
        }

        res.send(product);
    };
    getTLGomTem = async (req, res, next) => {
        const product = await ProductModel.findTLGomTem({  TL_gom_tem: req.params.TL_gom_tem });
        if (!product) {
            throw new HttpException(404, 'Product not found');
        }

        res.send(product);
    };
    getTLChuaTem = async (req, res, next) => {
        const product = await ProductModel.findTLChuaTem({  TL_chua_tem: req.params.TL_chua_tem });
        if (!product) {
            throw new HttpException(404, 'Product not found');
        }

        res.send(product);
    };
    getByActived = async (req, res, next) => {
        const product = await ProductModel.findByActived({  actived: req.params.actived });
        if (!product) {
            throw new HttpException(404, 'Product not found');
        }

        res.send(product);
    };

    deleteByID = async (req, res, next) => {
        const result = await ProductModel.deleteByID(req.params.ID_danh_muc_sp);
        if (!result) {
            throw new HttpException(404, 'Product not found');
        }
        res.send('The Product has been deleted');
    };
    deleteByMaRFID = async (req, res, next) => {
        const result = await ProductModel.deleteByMaRFID(req.params.ma_RFID);
        if (!result) {
            throw new HttpException(404, 'Product not found');
        }
        res.send('The Product has been deleted');
    };
    deleteByMaSp = async (req, res, next) => {
        const result = await ProductModel.deleteByMaSp(req.params.ma_san_pham);
        if (!result) {
            throw new HttpException(404, 'Product not found');
        }
        res.send('The Product has been deleted');
    };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
 module.exports = new ProductController;