const { NULL } = require('node-sass');
const query = require('../config/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');

class ScannerModel {
    tableName = 'lich_su_quet';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findByID = async(ID_lich_su_quet) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE ID_lich_su_quet = ?`;
        const result = await query(sql, [ID_lich_su_quet]);
        console.log("ID_lich_su_quet============",result);
        return result;
    }
    findByCheDo = async(che_do_may_quet) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE che_do_may_quet = ?`;
        const result = await query(sql, [che_do_may_quet]);
        console.log("che_do_may_quet============",result);
        return result;
    }
    findByThietBi = async(ID_thiet_bi) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE ID_thiet_bi = ?`;
        const result = await query(sql, [ID_thiet_bi]);
        console.log("ID_thiet_bi============",result);
        return result;
    }
    findByViTri = async(ds_vi_tri_quet) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE ds_vi_tri_quet = ?`;
        const result = await query(sql, [ds_vi_tri_quet]);
        console.log("ds_vi_tri_quet============",result);
        return result;
    }
    //Tìm tất cả lịch sử quét của 1 máy trạm, chế độ máy trạm, theo 01 vị trí nhất định
    find_OneTram_AllDay = async ({ che_do_may_quet, ID_thiet_bi, ds_vi_tri_quet }) => {
        

        const sql = `SELECT * FROM ${this.tableName} WHERE che_do_may_quet=? and ID_thiet_bi=? and ds_vi_tri_quet=?`;
        const result = await query(sql, [che_do_may_quet,ID_thiet_bi,ds_vi_tri_quet]);
        console.log("result============",result);
        return result;
    }
    //Tìm tất cả lịch sử quét của 1 máy trạm, chế độ máy trạm, theo 01 vị trí nhất định
    find_CamTay_AllDay = async ({che_do_may_quet, ID_thiet_bi, ds_vi_tri_quet }) => {
        console.log("result============",che_do_may_quet, ID_thiet_bi, ds_vi_tri_quet );
        const sql = `SELECT * FROM ${this.tableName} WHERE che_do_may_quet=? and ID_thiet_bi=? and CONVERT(ds_vi_tri_quet using 'utf8') LIKE CONCAT("%", ? , "%")`;
        const result = await query(sql, [che_do_may_quet,ID_thiet_bi,ds_vi_tri_quet]);
        console.log("result============",result);
        return result;
    }

    deleteByID = async (ID_lich_su_quet) => {
        const sql = `DELETE FROM ${this.tableName} WHERE ID_lich_su_quet = ?`;
        const result = await query(sql, [ID_lich_su_quet]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    create = async ({ma_nhom_sp,ma_RFID,ma_san_pham,ten_nhom,ten_sp,TL_chua_tem,TL_gom_tem,actived,note }) => {
       console.log("=======user_name=====",user_name);
        const sql = `INSERT INTO ${this.tableName}
        (ma_nhom_sp,ma_RFID,ma_san_pham,ten_nhom,ten_sp,TL_chua_tem,TL_gom_tem,actived,note) VALUES (?,?,?,?,?,?,?,?,?)`;

        const result = await query(sql, [ma_nhom_sp,ma_RFID,ma_san_pham,ten_nhom,ten_sp,TL_chua_tem,TL_gom_tem,actived,note]);
        const affectedRows = result ? result.affectedRows : 0;
        console.log("=======result=====",result);
        return affectedRows;
    }

}

module.exports = new ScannerModel;