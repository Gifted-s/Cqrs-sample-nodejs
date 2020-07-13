const _ = require('lodash')

const reportDatabase= (function(){
 let _this = {}
 let reportDb={
    inventoryHomeDb:[],
    inventoryDetailsDb:[]
 } 

_this.createDump = function(){
   return reportDb
}
_this.clearDatabase = function(){
    reportDb.inventoryDetailsDb= []
    reportDb.inventoryHomeDb =[]
}

_this.createItem = function(dbName, inventoryItem, callback){
  checkHandler(dbName).then(db=>{
      if(db){
          
          db.push(inventoryItem)
          return callback()
      }
     
  })
}

_this.renameItem = function(dbName, inventoryItem, callback){
    checkHandler(dbName).then(db=>{
        
        if(db){
            findInventoryById(inventoryItem.id, db).then((item)=>{
              
                if(item){
                   
                    item.name = inventoryItem.name
                    return callback()
                }
               
            })
        }
   
    })
}

_this.checkIn = function(dbName, inventoryItem, callback){
    checkHandler(dbName).then(db=>{
        if(db){
            findInventoryById(inventoryItem.id, db).then((item)=>{
                if(item){
                    item.number = inventoryItem.number
                    return callback()
                }
              
            })
        }
       
    })
}


_this.checkOut = function(dbName, inventoryItem, callback){
    checkHandler(dbName).then(db=>{
        if(db){
            findInventoryById(inventoryItem.id, db).then((item)=>{
                if(item){
                    item.number = inventoryItem.number
                    return callback()
                }
               
            })
        }
      
    })
}

_this.deactivate = function(dbName, inventoryItem, callback){
    checkHandler(dbName).then(db=>{
        if(db){
            findInventoryById(inventoryItem.id, db).then((item)=>{
                if(item){
                    item.activated = false
                    return callback()
                }
               
            })
        }
       
    })
}

 async function checkHandler(dbName){
  if(dbName in reportDb){
      return reportDb[dbName]
  }
  return false
 }

 async function findInventoryById(id, db){
  let item= _.find(db, (inventoryItem)=> inventoryItem.id = id)
  if(item){
      return item
  }
  else{
      return false
  }
 }
return _this
})()

module.exports = reportDatabase