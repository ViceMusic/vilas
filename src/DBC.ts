const MysqlStrategy =require("./Strategy/MysqlStrategy")
class DBC{
    //一些属性：y
    Strategy: MysqlStrategy;
    
    //构造器
    constructor(obj:{database:string,url:string,username:string,password:string,databaseName:string,port?:number}) {
        //需要注意一点的就是这里,我们默认这里逻辑上使用了面向对象的方法,继承了一个接口
        //所有的模式都具有一样的方法,传入参数一致,但是内部实现不一样

        //生成mysql的处理对象
        if(obj.database==='MySQL'){
            this.Strategy=new MysqlStrategy(obj.url,obj.username,obj.password,obj.databaseName,obj.port)
        }

        //暂时不支持这个数据库
        else{
            throw new Error('Unsupported database type');
        }
    }
    disConnect(){
        if(this.Strategy){
            this.Strategy.disConnect()
        }else{
            throw new Error('The connection is not established !');
        }

    }

}
module.exports=DBC;

