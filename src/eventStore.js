const _ = require('lodash')
const stream =require('stream')
const eventStore =(function(){
  let _this= {}
  let storedEvent= []
  _this.createDump= function(){
      return storedEvent
  }
  _this.get= function(id, callback){
    geteEventsById(id).then(storedEvents=>{
      let eventStream = new stream.PassThrough({objectMode:true})
      storedEvents.events.forEach(event=>{
          eventStream.write(event)
      })
      eventStream.end()

      return callback(null, eventStream)
    })
    .catch(err=>{
        return callback(err)
    })
  }
  
  _this.save= function(domainEvents,id,version, callback){
    geteEventsById(id).then(storedEvents=>{
        
        if(!storedEvents){
           storedEvents ={

               id,
               events:domainEvents
           }
           storedEvent.push(storedEvents)
           return callback()
        }
        if(_.last(storedEvents.events).eventVersion !== version){
            throw new Error('Concurrency Error Version mismatch')
        }
        domainEvents.forEach((event)=>{
            storedEvents.events.push(event)
        })
        return callback()
      
    })
    .catch(err=>{
        callback(err)
    })
  }
  async function geteEventsById(id){
  let foundItem= _.find(storedEvent,(event)=>{
      return event.id=id 
   })
  
   return foundItem
  }
return _this
})()

module.exports = eventStore