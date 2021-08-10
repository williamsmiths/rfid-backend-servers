const { NULL } = require('node-sass');
const query = require('../config/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');

class UserModel {
    tableName = 'tai_khoan';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (name,params) => {
        const sql = `SELECT * FROM ${this.tableName};
        WHERE ${columnSet}`;

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;
        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    findByUserName = async ({ user_name }) => {
        try {
          const sql = `SELECT * FROM ${this.tableName} WHERE user_name = ?`;
          const result = await query(sql, [user_name]);
          return result;
        } catch (error) {
          throw error;
        }
      };

    findByDislayName = async ({ display_name }) => {
        const sql = `SELECT display_name FROM ${this.tableName}
            WHERE display_name = ?`;
        const result = await query(sql, [display_name]);
        return result;
      };
    

    findByUserID = async({ID_tai_khoan}) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE ID_tai_khoan = ?`;
        const result = await query(sql, [ID_tai_khoan]);
        console.log("ID_tai_khoan============",result[0]);
        return result[0];
    }
    findByRole = async({role}) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE role = ?`;
        const result = await query(sql, [role]);
        console.log("role============",result);
        return result;
    }
    findByActived = async({actived}) => {
        
        const sql = `SELECT * FROM ${this.tableName} WHERE actived=?`;
        
        const result = await query(sql, [actived]);
        console.log("actived============",result);
        return result;
    }
     deleteByID = async ({ID_tai_khoan}) => {
        const sql = `DELETE FROM ${this.tableName} WHERE ID_tai_khoan = ?`;
        const result = await query(sql, [ID_tai_khoan]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    deleteByUserName = async (user_name) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE user_name = ?`;
        const result = await query(sql, [user_name]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    create = async ({ user_name, password,salt, display_name, role, address, actived,created,updated }) => {
       console.log("=======user_name=====",user_name);
        const sql = `INSERT INTO ${this.tableName}
        (user_name, password,salt, display_name, role, address, actived,created,updated) VALUES (?,?,?,?,?,?,?,?,?)`;

        const result = await query(sql, [user_name, password,salt, display_name, role, address, actived,created,updated]);
        const affectedRows = result ? result.affectedRows : 0;
        console.log("=======result=====",result);
        return affectedRows;
    }

    // update = async (params, id) => {
    //     const { columnSet, values } = multipleColumnSet(params)

    //     const sql = `UPDATE user SET ${columnSet} WHERE id = ?`;

    //     const result = await query(sql, [...values, id]);

    //     return result;
    // }

    // delete = async (id) => {
    //     const sql = `DELETE FROM ${this.tableName}
    //     WHERE id = ?`;
    //     const result = await query(sql, [id]);
    //     const affectedRows = result ? result.affectedRows : 0;

    //     return affectedRows;
    // }
}

module.exports = new UserModel;