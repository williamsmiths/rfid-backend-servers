const { NULL } = require('node-sass');
const query = require('../config/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');

class ProductModel {
    tableName = 'danh_muc_sp';

    find = async (params = {}) => {
        let sql = `SELECT *,ROUND(TL_chua_tem,2) as 'TL_chua_tem',ROUND(TL_gom_tem,2) as 'TL_gom_tem' FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findAllHasRFID  = async (params = {}) => {
        let sql = `SELECT *,ROUND(TL_chua_tem,2) as 'TL_chua_tem',ROUND(TL_gom_tem,2) as 'TL_gom_tem' FROM ${this.tableName} WHERE ma_RFID<>''`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }
    
    findByNoRFID = async (params = {}) => {
        let sql = `SELECT *,ROUND(TL_chua_tem,2) as 'TL_chua_tem',ROUND(TL_gom_tem,2) as 'TL_gom_tem' FROM ${this.tableName} WHERE ma_RFID='' or ma_RFID is null`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findByID = async({ID_danh_muc_sp}) => {
        const sql = `SELECT *,ROUND(TL_chua_tem,2) as 'TL_chua_tem',ROUND(TL_gom_tem,2) as 'TL_gom_tem' FROM ${this.tableName} WHERE ID_danh_muc_sp = ?`;
        const result = await query(sql, [ID_danh_muc_sp]);
        console.log("ID_danh_muc_sp============",result[0]);
        return result[0];
    }

    findByMaRFID = async ({ ma_RFID }) => {
        const sql = `SELECT *,ROUND(TL_chua_tem,2) as 'TL_chua_tem',ROUND(TL_gom_tem,2) as 'TL_gom_tem' FROM ${this.tableName} WHERE ma_RFID = ?`;
          const result = await query(sql, [ma_RFID]);
          console.log("ma_RFID============",result[0]);
          return result[0];
      };

    findByMaSp = async({ma_san_pham}) => {
        const sql = `SELECT *,ROUND(TL_chua_tem,2) as 'TL_chua_tem',ROUND(TL_gom_tem,2) as 'TL_gom_tem' FROM ${this.tableName} WHERE ma_san_pham = ?`;
        const result = await query(sql, [ma_san_pham]);
        console.log("ma_san_pham============",result[0]);
        return result[0];
    }
    findByMaNhomSp = async ({ ma_nhom_sp }) => {
        const sql = `SELECT *,ROUND(TL_chua_tem,2) as 'TL_chua_tem',ROUND(TL_gom_tem,2) as 'TL_gom_tem' FROM ${this.tableName}
            WHERE ma_nhom_sp = ?`;
        const result = await query(sql, [ma_nhom_sp]);
        return result;
    };
    
    findTLGomTem = async({TL_gom_tem}) => {
        const sql = `SELECT *, ROUND(TL_chua_tem,2) as 'TL_chua_tem',ROUND(TL_gom_tem,2) as 'TL_gom_tem' FROM ${this.tableName} WHERE TL_gom_tem =?`;
        const result = await query(sql, [TL_gom_tem]);
        console.log("TL_gom_tem============",result);
        return result;
    }
    findTLChuaTem = async({TL_chua_tem}) => {
        const sql = `SELECT *,ROUND(TL_chua_tem,2) as 'TL_chua_tem',ROUND(TL_gom_tem,2) as 'TL_gom_tem' FROM ${this.tableName} WHERE TL_chua_tem = ?`;
        const result = await query(sql, [TL_chua_tem]);
        console.log("TL_chua_tem============",result);
        return result;
    }
    findByActived = async({actived}) => {
        
        const sql = `SELECT *,ROUND(TL_chua_tem,2) as 'TL_chua_tem',ROUND(TL_gom_tem,2) as 'TL_gom_tem' FROM ${this.tableName} WHERE actived=?`;
        
        const result = await query(sql, [actived]);
        console.log("actived============",result);
        return result;
    }
     deleteByID = async (ID_danh_muc_sp) => {
        const sql = `DELETE FROM ${this.tableName} WHERE ID_danh_muc_sp = ?`;
        const result = await query(sql, [ID_danh_muc_sp]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
    deleteByMaRFID = async (ma_RFID) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE ma_RFID = ?`;
        const result = await query(sql, [ma_RFID]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
    deleteByMaSp = async (ma_san_pham) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE ma_san_pham = ?`;
        const result = await query(sql, [ma_san_pham]);
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

module.exports = new ProductModel;