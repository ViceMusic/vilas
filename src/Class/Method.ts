const {Column,Value} =require( "./Item")

//传入的东西是什么其实无所吊,因为方法内部是可以处理掉的
function value(text:any):Value{
    return new Value(text)
}

//如果传入的字段名称不是字符串,那么返回一个null
function column(text:string):Column|null{
    if(typeof text==='string')
       return new Column(text)
    else
       return null
}

module.exports= {value,column}
