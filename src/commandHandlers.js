let inventoryDomain = require('./inventoryItem')
let repsitory = new inventoryDomain.Repository()
exports.createInventoryItem = function(command, callback){

 const defaultCheckInNumber = 17;
 let inventoryItem = inventoryDomain.create(command.inventoryItemId, command.name)
 inventoryItem.checkIn(defaultCheckInNumber)
 repsitory.save(inventoryItem, callback)
}
exports.checkoutItemsFromInventory = function(command, callback){
    repsitory.get(command.inventoryItemId, function(err, inventoryItem){
        if(err){
            callback(err)
        }
        inventoryItem.checkOut(command.numberOfItems)
        repsitory.save(inventoryItem,callback)
    })
}

exports.deactivateInventoryItem = function(command, callback){
    repsitory.get(command.inventoryItemId, function(err, inventoryItem){
        if(err){
            callback(err)
        }
        inventoryItem.deactivate()
        repsitory.save(inventoryItem,callback)
    })
}

exports.renameInventoryItem = function(command, callback){
    repsitory.get(command.inventoryItemId, function(err, inventoryItem){
        if(err){
            callback(err)
        }
        inventoryItem.rename(command.name)
        repsitory.save(inventoryItem,callback)
    })
}

