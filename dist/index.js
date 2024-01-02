"use strict";
const DBC = require('./DBC');
const Filter = require('./MysqlClass/Filter');
const { value, column } = require("./MysqlClass/MethodGetClassOfMysql");
module.exports = {
    DBC: DBC,
    Filter: Filter,
    value: value,
    column: column,
};
