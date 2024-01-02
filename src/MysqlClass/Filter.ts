class Filter{

    //条件字符串,这个是目前在拼接字符串阶段需要使用的部分
    condition:string=''

    //参数数目,这个后期才用得上
    numOfParameters:number=0

    //空缺参数列表
    arrayOfParameters:Array<any>=[]

    //单纯的构造函数允许传入一些字符串........
    constructor(condition:string,numberOfElements:number,arrayOfElements:Array<any>) {
        this.condition=condition
        this.numOfParameters=numberOfElements
        this.arrayOfParameters=arrayOfElements
    }

    and(filter:Filter){
        const newCondition=`( ${this.condition} ) AND ( ${filter.condition} )`
        const newNumOfParameters=this.numOfParameters+filter.numOfParameters
        const newArrayOfParameters=[...this.arrayOfParameters,...filter.arrayOfParameters]

        return new Filter(newCondition,newNumOfParameters,newArrayOfParameters)
    }

    or(filter:Filter){
        const newCondition=`( ${this.condition} ) OR ( ${filter.condition} )`
        const newNumOfParameters=this.numOfParameters+filter.numOfParameters
        const newArrayOfParameters=[...this.arrayOfParameters,...filter.arrayOfParameters]

        return new Filter(newCondition,newNumOfParameters,newArrayOfParameters)
    }

}
module.exports=Filter;