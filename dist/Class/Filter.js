"use strict";
class Filter {
    //单纯的构造函数允许传入一些字符串........
    constructor(condition, numberOfElements, arrayOfElements) {
        //条件字符串,这个是目前在拼接字符串阶段需要使用的部分
        this.condition = '';
        //参数数目,这个后期才用得上
        this.numOfParameters = 0;
        //空缺参数列表
        this.arrayOfParameters = [];
        this.condition = condition;
        this.numOfParameters = numberOfElements;
        this.arrayOfParameters = arrayOfElements;
    }
    and(filter) {
        const newCondition = `( ${this.condition} ) AND ( ${filter.condition} )`;
        const newNumOfParameters = this.numOfParameters + filter.numOfParameters;
        const newArrayOfParameters = [...this.arrayOfParameters, ...filter.arrayOfParameters];
        return new Filter(newCondition, newNumOfParameters, newArrayOfParameters);
    }
    or(filter) {
        const newCondition = `( ${this.condition} ) OR ( ${filter.condition} )`;
        const newNumOfParameters = this.numOfParameters + filter.numOfParameters;
        const newArrayOfParameters = [...this.arrayOfParameters, ...filter.arrayOfParameters];
        return new Filter(newCondition, newNumOfParameters, newArrayOfParameters);
    }
}
module.exports = Filter;
