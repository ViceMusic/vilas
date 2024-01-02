# About my project

> * author: ViceMusic5 
> * email: xarnudvilas@gmail.com
> * version:0.3.3

just a simple project developed and maintained by a undergraduate

> ChangeLog:
>
> Now we start to use typescript as the fundamental language， and switch ‘commonJS’ to ‘es6’。Maybe you can use this framework in FRONT insteal END
>
> by the way,because the unstable supportion of "es6",this is just a beta version. I will upgrade it as soon.
>
> and amend some bug in code:D
> 
> Now you can give a NULl to express you need not any filter .
> 
> A bigger Update ! rejoice !
> 
> In the version, we introduce two main class "Filter" and "Item" to build a safer and  simpler filter condition.
> 
> But ,this version is just a beta, I need some try from my friends , just you!
> 
> More specifically, if you hava any question about my framework, please give me a feedback or suggestion through gmail : **xarnudvilas@gmail.com**

## 0. How to use this orm frame work
1. In the 0.1.2 version,we define the methods of introducing again:

   ```
   //import by destructing from vilas
   import {DBC} from 'vilas'
   
   //create Database connection object
   const Controller=new DBC({
       database:'MySQL',
       url:'127.0.0.1',
       username: 'root',
       password:'123456',
       databaseName: 'deliver_system',
       port:3306    //optional
   })
   
   //operate the database by 
   Controller.Strategy.query([],'comment').then((result)=>{})
   
   //eliminate connection with you resources
   Controller.disConnect()
   ```
   



2. change the method of disconnection

   ```
   Controller.Strategy.disConnect()
   ```

   swift

   ```
   Controller.disConnect()
   ```

3. how to use new filter object

   in this version ,we fix a key method , now you can liberally establish embedding or embedded filter condition through And and Or function

   ```
   dbc.Strategy.query(['uname']
    , value(12).equal_to(value(12))
    , 'comment')
    .then(result => console.log(result))
    .catch(error=>console.log(error))
   ```
   this code is equal to
   ```
   select uname from comment where 12=12
   ```
   
## 1. api
* class and constructors:

  | Function         | Intro                                                        | parameters                                                   | return        | description                                                  |
    | ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------- | ------------------------------------------------------------ |
  | DBC(constructor) | const DBC=require('vilas')                                   | Object of arguments({database , url, username, password, databaseName, port}) | DBC Object    | DataBase Controller, which has many responsibilities like establish connection, operation in databaseTable , release connection and so on. |
  | Filter           | **NOTICE: we don't agree use this contructor when you build a web-app!** | -------------------------------------                        | ------------- | This object stand for the filter condition(WHERE) in your sql selection sentences.   (**NOTICE: you can only get this object by the comparable function of Item and the "and" "or" function, rather than use contructor**) |
  | Item             | **NOTICE: we don't agree use this contructor when you build a web-app!** | -------------------------------------                        | ------------  | The super class of Column and Value (**NOTICE: you can only get this object by the specifical function of Item **) |
  | Column           | **NOTICE: we don't agree use this contructor when you build a web-app!** |                                                              |               | The name of one of column in a sql                           |
  | Value            | **NOTICE: we don't agree use this contructor when you build a web-app!** |                                                              |               | The value of one of value in a sql                           |

* function of DBC

  | Function   | Intro            | parameter | return | description                                           |
    | ---------- | ---------------- | --------- | ------ | ----------------------------------------------------- |
  | disConnect | DBC.disConnect() | -----     | ----   | close a database connection and release some resource |
  |            |                  |           |        |                                                       |

* function of Strategy in DBC

  | Function        | Intro                          | parameter                                                    | return  |      |
    | --------------- | ------------------------------ | ------------------------------------------------------------ | ------- | ---- |
  | query_out_date  | DBC.Strategy.query_out_date()  | parameter:**array**, filters:**array**,tableName:**string**  | promise |      |
  | append          | DBC.Strategy.append()          | columns:**array**,values:**array**,table:string              | promise |      |
  | remove_out_date | DBC.Strategy.remove_out_date() | filters:**array**,table:**string**                           | promise |      |
  | change_out_date | DBC.Strategy.change_out_date() | columns:**array**,values:**array**,filters:**array**,table:string | promise |      |
  | getInfoOfCol    | DBC.Strategy.getInfoOfCol()    | table:**string**                                             | promise |      |
  | query           | DBC.Strategy.query             | parameter:**array**,tableName:**string**,filter:**Filter**  | promise |      |
  | remove          | DBC.Strategy.remove            | tableName:**string**,filter:**Filter**                       | promise |      |
  | change          | DBC.Strategy.change            | columns:**array**,values:**array**,tableName:**string**,filter:**Filter** | promise |      |



* function of Item

  | Function      | Intro                | parameter | return | description                          |
    | ------------- | -------------------- | --------- | ------ | ------------------------------------ |
  | equal_to      | Item.equal_to()      | Item      | Filter | =                                    |
  | unEqual_to    | Item.unEqual_to()    | Item      | Filter | !=                                   |
  | move_than     | Item.move_than()     | Item      | Filter | >                                    |
  | move_or_equal | Item.move_or_equal() | Item      | Filter | >=                                   |
  | less_than     | Item.less_than()     | Item      | Filter | <                                    |
  | less_or_equal | Item.less_or_equal() | Item      | Filter | <=                                   |
  | like_with     | Item.like_with()     | Item      | Filter | Like operation in your sql sentences |



* function of Filter

  | Function      | Intro        | parameter | return | description                                   |
    | ------------- | ------------ | --------- | ------ | --------------------------------------------- |
  | and           | Filter.and() | Filter    | Filter | establish a 'and' relation between two Filter |
  | or            | Filter.or()  | Filter    | Filter | establish a 'or' relation between two Filter  |
  | waiting...... |              |           |        |                                               |
  | waiting...... |              |           |        |                                               |



* some additional function (being used to get Column and Value object )

  | Function | Intro                                            | parameter   | return | description                      |
    | -------- | ------------------------------------------------ | ----------- | ------ | -------------------------------- |
  | column   | const {column} = require("vlias");    column()   | text:string | Item   | like a constructor without "new" |
  | value    | const {value} = require("vlias");        value() | text:auto   | Item   | like a constructor without "new" |

  

