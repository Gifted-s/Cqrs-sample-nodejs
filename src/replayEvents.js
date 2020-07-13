const messageBus = require("./messageBus");
const eventStore = require("./eventStore");

const replayEvent = function(){
    const aggregates = eventStore.createDump()
    aggregates.forEach((aggregate)=>{
       aggregate.events.forEach((event)=>{
         messageBus._publish(event)
       })
    })
}

module.exports= replayEvent