const reportDb = require('./reportDatabase')
const util = require('util')
const stream = require('stream')
exports.InventoryDetailsAggregator = InventoryDetailsAggregator
exports.InventoryHomeAggregator =  InventoryHomeAggregator

function ReportAggregate(){
    stream.Writable.call(this, {objectMode:true})
}
util.inherits(ReportAggregate, stream.Writable)
ReportAggregate.prototype._write= function(domainEvent, encodeType, next){
    const eventHandlerName = 'handle' + domainEvent.eventName 
    const eventHandler = this[eventHandlerName] || dummyeventHandler
    eventHandler(domainEvent, function(err){
      if(err){
          throw new Error('there awas an error while handling event')
      }
      next()
    })
}
function dummyeventHandler(event, callback){
    process.nextTick(callback)
}

const InventoryHome = 'inventoryHomeDb'

function InventoryHomeAggregator(){
    ReportAggregate.call(this, {objectMode:true})
}
util.inherits(InventoryHomeAggregator, ReportAggregate)
InventoryHomeAggregator.prototype.handlecreateItem= function(domainEvent, callback){
 let inventoryItem={
     id:domainEvent.aggregateId,
     name:domainEvent.name
 }
 reportDb.createItem(InventoryHome, inventoryItem, callback)
}
InventoryHomeAggregator.prototype.handlerenameItem= function(domainEvent, callback){
    let inventoryItem={
        id:domainEvent.aggregateId,
        name:domainEvent.name
    }
    reportDb.renameItem(InventoryHome,inventoryItem, callback)
}

InventoryHomeAggregator.prototype.handledeActivateItem= function(domainEvent, callback){
    const  inventoryItem = {
        id:domainEvent.aggregateId,
   }
    reportDb.deactivate(InventoryHome,inventoryItem, callback)
}
// console.log(new InventoryHomeAggregator(), "tere")

const inventoryDetailsDb = 'inventoryDetailsDb'
function InventoryDetailsAggregator(){
  ReportAggregate.call(this, {objectMode:true})
}
console.log(new InventoryDetailsAggregator())
util.inherits(InventoryDetailsAggregator,ReportAggregate)

InventoryDetailsAggregator.prototype.handlecreateItem= function(domainEvent, callback){
    const  inventoryItem = {
         id:domainEvent.aggregateId,
         name:domainEvent.name,
         number:0
    }
    reportDb.createItem(inventoryDetailsDb,inventoryItem,callback)
}

InventoryDetailsAggregator.prototype.handlerenameItem= function(domainEvent, callback){
    const  inventoryItem = {
        id:domainEvent.aggregateId,
        name:domainEvent.name,
       
   }
  
 reportDb.renameItem(inventoryDetailsDb,inventoryItem, callback)
}
InventoryDetailsAggregator.prototype.handledeActivateItem= function(domainEvent, callback){
    const  inventoryItem = {
        id:domainEvent.aggregateId,
   }
    reportDb.deactivate(inventoryDetailsDb,inventoryItem,callback)
}

InventoryDetailsAggregator.prototype.handlecheckInItem= function(domainEvent, callback){
    const  inventoryItem = {
        id:domainEvent.aggregateId,
        number:domainEvent.number
   }
    reportDb.checkIn(inventoryDetailsDb,inventoryItem,callback)
}

InventoryDetailsAggregator.prototype.handlecheckOutItem= function(domainEvent, callback){
    const  inventoryItem = {
        id:domainEvent.aggregateId,
        number:domainEvent.number
   }
    reportDb.checkOut(inventoryDetailsDb,inventoryItem, callback)
}

