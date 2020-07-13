const reportAggregator = require('./reportAggregators')
const messageBus = require('./messageBus')
const InventoryDetailsAggregator = new reportAggregator.InventoryDetailsAggregator()
const InventoryHomeAggregator = new reportAggregator.InventoryHomeAggregator()
const bootstrap = function(){
    messageBus._register( InventoryHomeAggregator,InventoryDetailsAggregator)
}

exports.bootstrap = bootstrap
