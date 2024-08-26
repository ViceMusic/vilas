"use strict";
const Filter = require('./Filter');
class Item {
    //构造方法暂时还没想名白怎么用
    //构造方法暂时不交给外界
    constructor() {
        //声明这是列还是数值
        this.type = 'original';
        //文本
        this.text = 'henshin!';
    }
    //>
    more_than(item) {
        //关于具体的字段信息
        let num = 0;
        let element = [];
        let sql = '';
        sql = ` ${this.type === 'Value' ? '?' : this.text} > ${item.type === 'Value' ? '?' : item.text} `;
        if (this.type === 'Value') {
            num++;
            element = [this.text];
        }
        if (item.type === 'Value') {
            num++;
            element = [...element, item.text];
        }
        return new Filter(sql, num, element);
    }
    //<
    less_than(item) {
        //关于具体的字段信息
        let num = 0;
        let element = [];
        let sql = '';
        sql = ` ${this.type === 'Value' ? '?' : this.text} < ${item.type === 'Value' ? '?' : item.text} `;
        if (this.type === 'Value') {
            num++;
            element = [this.text];
        }
        if (item.type === 'Value') {
            num++;
            element = [...element, item.text];
        }
        return new Filter(sql, num, element);
    }
    //>=
    more_or_equal(item) {
        //关于具体的字段信息
        let num = 0;
        let element = [];
        let sql = '';
        sql = ` ${this.type === 'Value' ? '?' : this.text} >= ${item.type === 'Value' ? '?' : item.text} `;
        if (this.type === 'Value') {
            num++;
            element = [this.text];
        }
        if (item.type === 'Value') {
            num++;
            element = [...element, item.text];
        }
        return new Filter(sql, num, element);
    }
    //<=
    less_or_equal(item) {
        //关于具体的字段信息
        let num = 0;
        let element = [];
        let sql = '';
        sql = ` ${this.type === 'Value' ? '?' : this.text} <= ${item.type === 'Value' ? '?' : item.text} `;
        if (this.type === 'Value') {
            num++;
            element = [this.text];
        }
        if (item.type === 'Value') {
            num++;
            element = [...element, item.text];
        }
        return new Filter(sql, num, element);
    }
    //=
    equal_to(item) {
        //关于具体的字段信息
        let num = 0;
        let element = [];
        let sql = '';
        sql = ` ${this.type === 'Value' ? '?' : this.text} = ${item.type === 'Value' ? '?' : item.text} `;
        if (this.type === 'Value') {
            num++;
            element = [this.text];
        }
        if (item.type === 'Value') {
            num++;
            element = [...element, item.text];
        }
        return new Filter(sql, num, element);
    }
    //!=
    unEqual_to(item) {
        //关于具体的字段信息
        let num = 0;
        let element = [];
        let sql = '';
        sql = ` ${this.type === 'Value' ? '?' : this.text} != ${item.type === 'Value' ? '?' : item.text} `;
        if (this.type === 'Value') {
            num++;
            element = [this.text];
        }
        if (item.type === 'Value') {
            num++;
            element = [...element, item.text];
        }
        return new Filter(sql, num, element);
    }
    //like
    like_with(item) {
        //关于具体的字段信息
        let num = 0;
        let element = [];
        let sql = '';
        sql = ` ${this.type === 'Value' ? '?' : this.text} LIKE ${item.type === 'Value' ? '?' : item.text} `;
        if (this.type === 'Value') {
            num++;
            element = [this.text];
        }
        if (item.type === 'Value') {
            num++;
            element = [...element, item.text];
        }
        return new Filter(sql, num, element);
    }
}
//列名:默认传入的就是字符串,不过这里防止用户调用这个Api,保留了内部的判断方法
class Column extends Item {
    constructor(text) {
        super();
        this.type = 'Column';
        if ((typeof text) === "string") { //这里需要判断一下传入的类型,如果是数字就直接填入,如果是一些奇奇怪怪的数值就处理一下
            this.text = text;
        }
        else if (typeof text === "object") { //当传入数据是一些复杂的东西,比如日期的时候,就会识别为object
            console.log('字段你传入对象干什么???');
        }
        else { //数据是一些其他的情况
            console.log('...必须要字符串啊');
        }
    }
}
//数值:数值传入的时候是允许多种情况的
class Value extends Item {
    constructor(text) {
        super();
        this.type = 'Value';
        if ((typeof text) === "string") { //这如果是字符串就要加上转义
            this.text = "\"" + text + "\"";
        }
        else if (typeof text === "object") { //当传入数据是一些复杂的东西,比如日期的时候,就会识别为object
            if (text instanceof Date) {
                console.log('myDate是一个Date类型,但是我还没想好怎么处理');
            }
            this.text = 'object';
        }
        else { //数据是一些其他的情况
            this.text = text;
        }
    }
}
module.exports = { Column, Value };
