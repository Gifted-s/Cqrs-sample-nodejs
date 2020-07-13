const messageBus = (function(){
 let _eventHandler = []
 let _this ={}
 _this._register= function(eventHandler1, eventHandler2){
     _eventHandler.push(eventHandler1, eventHandler2)
 }
 _this._publish = function(event){
   _eventHandler.forEach((eventHandler)=>eventHandler.write(event))

 }

 return _this
})()

module.exports = messageBus