const AggregateRoot = require('./aggregateRoot')
const util= require('util')
const eventStore = require('./eventStore')
const messageBus = require('./messageBus')

exports.create = function create(id,name){
 return new InventoryItem(id,name)

}
exports.Repository = InventoryRepository

function InventoryItem(id, name){
	this._name = "";
	this._isActive = false;
	this._number = 0;

	AggregateRoot.call(this, id)
	subscribeToevents(this)
	if(name){
		this.apply('createItem', {
			name
		})
	}

}

util.inherits(InventoryItem, AggregateRoot)
InventoryItem.prototype.checkIn= function(number){
this.apply('checkInItem', {
	number:this._number + number
})
}
InventoryItem.prototype.checkOut = function(number){
	this.apply('checkOutItem', {
		number:this._number - number
})
}
InventoryItem.prototype.rename= function(name){
	this.apply('renameItem', {
		name
	})
}
InventoryItem.prototype.deactivate= function () {
	this.apply('deActivateItem', {})
}


function subscribeToevents(inventoryItem){
let item = inventoryItem

inventoryItem.toEvent('createItem', function(inventoryItem){
 item._name = inventoryItem.name
})
inventoryItem.toEvent('checkInItem', function(inventoryItem){
item._number =  inventoryItem.number
})

inventoryItem.toEvent('renameItem', function(inventoryItem) {
	item._name = inventoryItem.name
})
inventoryItem.toEvent('checkOutItem', function (inentoryItem) {
	item._number = inventoryItem.number
})
inventoryItem.toEvent('deActivateItem', function (inventoryItem) {
	item._isActive = false
})
}

function InventoryRepository() {}

// InventoryRepository.prototype.get =function (eventId) {
	
// }

InventoryRepository.prototype.save=function (inventoryItem,callback) {
	const transientEvent = inventoryItem.getTransientEvent()
	eventStore.save(transientEvent, inventoryItem.getId(), inventoryItem.getVersion(),(error=>{
     if(error){
		return callback(error)
	 }
	return callback()
	}))
    transientEvent.forEach(event => {
		messageBus._publish(event)
	});
}

InventoryRepository.prototype.get= function (id, callback) {
	
	const inventoryItem = new InventoryItem(id)
	eventStore.get(id, (err, eventStream)=>{
	  if(err){
		  return callback(err)
	  }
	  if(!eventStream){
		  throw new Error('Please preload event to an event stream')
	  }
	  eventStream.pipe(inventoryItem)
	  .on('error',(err)=>{
		  callback(err)
	  })
	  .on('finish', ()=>{
		  eventStream.unpipe()
		  return callback(null, inventoryItem)
	  })
	})
}
