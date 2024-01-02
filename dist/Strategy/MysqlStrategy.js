"use strict";
const mysql = require('mysql2');
const Filter = require('../MysqlClass/Filter');
class MysqlStrategy {
    //数据库链接方法
    constructor(url, username, password, databaseName, port) {
        this.databaseController = mysql.createConnection({
            host: url, // 数据库主机
            user: username, // 数据库用户名
            password: password, // 数据库密码
            database: databaseName, // 数据库名称
            port: (port ? port : 3306) //这是一个可选参数
        });
        this.databaseController.connect((err) => {
            if (err) {
                console.error('Error connecting to MySQL:', err);
                return;
            }
            console.log('Connected to MySQL database.');
        });
    }
    //具体的方法区域===============================================================================================
    //功能性方法区域=================================================
    //获取某个表的表名和方法
    getInfoOfCol(table) {
        return new Promise((resolve, reject) => {
            this.databaseController.query(`DESC ${table}`, (error, results) => {
                if (error) {
                    console.error('查询失败:', error);
                    reject(error); //这个万体相当于一个return
                }
                else {
                    console.log('Query results:', results);
                    resolve(results); //这个玩意相当于一个return
                }
            });
        });
    }
    //增删改查方法区=================================================
    //查询方法
    query_out_date(parameters, filters, table) {
        //拼接sql语句
        let sql = 'SELECT ';
        //获取的列
        if (parameters.length === 0) {
            sql += " * ";
        }
        for (let i = 0; i < parameters.length; i++) {
            if (i === 0)
                sql += parameters[i];
            else
                sql += "," + parameters[i];
        }
        //确定表的名称
        sql += ' from ' + `${table}`;
        //设置过滤条件(如果传入参数为空,这里则不会处理)
        for (let i = 0; i < filters.length; i++) {
            if (i === 0)
                sql += ' WHERE ' + filters[i];
            else
                sql += " AND " + filters[i];
        }
        //为了处理异步方法,这里需要返回一个promise对象........
        return new Promise((resolve, reject) => {
            this.databaseController.query(sql, (error, results) => {
                if (error) {
                    console.error('Query error:', error);
                    reject(error); //这个万体相当于一个return
                }
                else {
                    console.log('The number of Query results:', results.length);
                    resolve(results); //这个玩意相当于一个return
                }
            });
        });
    }
    //新增方法
    append(columns, values, table) {
        let sql = `INSERT INTO  ${table}`;
        //如果列为空,则默认为全部插入
        if (columns.length === 0) {
            sql += ' ';
        }
        //如果列不为空
        else {
            //传入字段不为空的时候,检查一下和数值数目是否匹配
            if (columns.length !== values.length) {
                console.error('传入字段数目和特征数目不匹配');
                return Promise.reject('传入字段数目和特征数目不匹配');
            }
            sql += '(';
            for (let i = 0; i < columns.length; i++) {
                if (i !== 0)
                    sql += ',';
                sql += columns[i];
            }
            sql += ') ';
        }
        sql += `VALUES`;
        if (values.length === 0) {
            sql += ' '; //虽然这个情况是会寄的,默认不会产生出这种情况
        }
        else {
            sql += '(';
            for (let i = 0; i < values.length; i++) {
                if (i !== 0)
                    sql += ',';
                if ((typeof values[i]) === "string") {
                    sql += "\"" + values[i] + "\"";
                }
                //当传入数据是一些复杂的东西,比如日期的时候,就会识别为object
                else if (typeof values[i] === "object") {
                    if (values[i] instanceof Date) {
                        console.log('myDate是一个Date类型,但是我还没想好怎么处理');
                    }
                    sql += 'object';
                }
                //数据是一些其他的情况
                else {
                    sql += values[i];
                }
            }
            sql += ') ';
        }
        //返回promise对象
        return new Promise((resolve, reject) => {
            this.databaseController.query(sql, (error, results) => {
                if (error) {
                    console.error('insert error:', error);
                    reject(error); //这个万体相当于一个return
                }
                else {
                    console.log('The return' +
                        ' insert results:', results);
                    resolve(results); //这个玩意相当于一个return
                }
            });
        });
    }
    //删除方法
    remove_out_date(filters, table) {
        let sql = `DELETE FROM ${table} `;
        //出现一些特别的情况
        if (filters.length === 0) {
            return new Promise((resolve, reject) => {
                reject("删除过滤条件不能为空");
            });
        }
        //设置过滤条件(如果传入参数为空,这里则不会处理)
        for (let i = 0; i < filters.length; i++) {
            if (i === 0)
                sql += ' WHERE ' + filters[i];
            else
                sql += " AND " + filters[i];
        }
        //返回promise对象
        return new Promise((resolve, reject) => {
            this.databaseController.query(sql, (error, results) => {
                if (error) {
                    console.error('remove error:', error);
                    reject(error);
                }
                else {
                    console.log('the number of remove results:', results.length);
                    resolve(results);
                }
            });
        });
    }
    //修改方法
    change_out_date(columns, values, filters, table) {
        let sql = `UPDATE  ${table}  SET `;
        //出现一些特别的情况
        if (columns.length === 0 || values.length === 0) {
            console.error("传入的字段数目和修改参数不能为空");
            return Promise.reject("传入的字段数目和修改参数不能为空");
        }
        else if (columns.length !== values.length) {
            console.error("修改的字段和参数的长度务必一致");
            return Promise.reject('修改的字段和参数的长度务必一致');
        }
        sql += ' ';
        for (let i = 0; i < values.length; i++) {
            if (i !== 0)
                sql += ',';
            //拼接名称
            sql += columns[i] + "=";
            //拼接数值
            if ((typeof values[i]) === "string") {
                sql += "\"" + values[i] + "\"";
            }
            //当传入数据是一些复杂的东西,比如日期的时候,就会识别为object
            else if (typeof values[i] === "object") {
                if (values[i] instanceof Date) {
                    console.log('myDate是一个Date类型,但是我还没想好怎么处理');
                }
                sql += 'object';
            }
            //数据是一些其他的情况
            else {
                sql += values[i];
            }
        }
        sql += ' ';
        //设置过滤条件(如果传入参数为空,这里则不会处理)
        for (let i = 0; i < filters.length; i++) {
            if (i === 0)
                sql += ' WHERE ' + filters[i];
            else
                sql += " AND " + filters[i];
        }
        //返回promise对象
        return new Promise((resolve, reject) => {
            this.databaseController.query(sql, (error, results) => {
                if (error) {
                    console.error('change error:', error);
                    reject(error);
                }
                else {
                    console.log('change results:', results);
                    resolve(results);
                }
            });
        });
    }
    //===================关闭链接,释放资源===============================
    //只有链接已经建立才会释放
    disConnect() {
        if (this.databaseController) {
            this.databaseController.end();
        }
    }
    //=============更新以后使用filter对象作为条件传入===============
    //查询方法
    query(columns, table, filter = null) {
        //拼接sql语句
        let sql = 'SELECT ';
        //获取的列
        if (columns.length === 0) {
            sql += " * ";
        }
        for (let i = 0; i < columns.length; i++) {
            if (i === 0)
                sql += columns[i];
            else
                sql += "," + columns[i];
        }
        //确定表的名称
        sql += ` FROM  ${table} `;
        if (filter && filter.condition) {
            sql += `WHERE ${filter.condition} `;
        }
        //为了处理异步方法,这里需要返回一个promise对象........
        return new Promise((resolve, reject) => {
            this.databaseController.query(sql, filter ? filter.arrayOfParameters : [], (error, results) => {
                if (error) {
                    console.error('Query error:', error);
                    reject(error); //这个万体相当于一个return
                }
                else {
                    console.log('The number of Query results:', results.length);
                    resolve(results); //这个玩意相当于一个return
                }
            });
        });
    }
    //修改方法
    change(columns, values, table, filter = null) {
        let sql = `UPDATE  ${table}  SET `;
        //出现一些特别的情况
        if (columns.length === 0 || values.length === 0) {
            console.error("传入的字段数目和修改参数不能为空");
            return Promise.reject("传入的字段数目和修改参数不能为空");
        }
        else if (columns.length !== values.length) {
            console.error("修改的字段和参数的长度务必一致");
            return Promise.reject('修改的字段和参数的长度务必一致');
        }
        sql += ' ';
        for (let i = 0; i < values.length; i++) {
            if (i !== 0)
                sql += ',';
            //拼接名称
            sql += columns[i] + "=";
            //拼接数值
            if ((typeof values[i]) === "string") {
                sql += "\"" + values[i] + "\"";
            }
            //当传入数据是一些复杂的东西,比如日期的时候,就会识别为object
            else if (typeof values[i] === "object") {
                if (values[i] instanceof Date) {
                    console.log('myDate是一个Date类型,但是我还没想好怎么处理');
                }
                sql += 'object';
            }
            //数据是一些其他的情况
            else {
                sql += values[i];
            }
        }
        if (filter && filter.condition) {
            sql += `WHERE ${filter.condition} `;
        }
        //返回promise对象
        return new Promise((resolve, reject) => {
            this.databaseController.query(sql, filter ? filter.arrayOfParameters : [], (error, results) => {
                if (error) {
                    console.error('change error:', error);
                    reject(error);
                }
                else {
                    console.log('change results:', results);
                    resolve(results);
                }
            });
        });
    }
    //移除方法
    remove(table, filter = null) {
        let sql = `DELETE FROM ${table} `;
        //出现一些特别的情况
        if (!filter) {
            return new Promise((resolve, reject) => {
                reject("删除过滤条件不能为空");
            });
        }
        if (filter && filter.condition) {
            sql += `WHERE ${filter.condition} `;
        }
        //返回promise对象
        return new Promise((resolve, reject) => {
            this.databaseController.query(sql, filter ? filter.arrayOfParameters : [], (error, results) => {
                if (error) {
                    console.error('remove error:', error);
                    reject(error);
                }
                else {
                    console.log('the number of remove results:', results.length);
                    resolve(results);
                }
            });
        });
    }
}
module.exports = MysqlStrategy;
