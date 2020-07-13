const util = require('util');
const stream= require('stream')
const EventEmitter2 = require('eventemitter2').EventEmitter2
const uuid= require('node-uuid')
module.exports = AggregateRoot
function AggregateRoot(id) {
    this._id=id
    this._transientEvents= [];
    this._version = 0;
    this._eventVersion = 0;
    this._eventEmmiter= new EventEmitter2();
    stream.Writable.call(this, {objectMode:true});
}

util.inherits(AggregateRoot, stream.Writable)
AggregateRoot.prototype.apply = function (eventName,domainEvent) {
    this._eventVersion +=1;
    enhanceDomainEvent(this,eventName,domainEvent)
    this._transientEvents.push(domainEvent)
    this._eventEmmiter.emit(domainEvent.eventName, domainEvent)
}
AggregateRoot.prototype.toEvent = function (event, eventHandler) {
    this._eventEmmiter.on(event, eventHandler)
}

AggregateRoot.prototype.getId = function () {
    return this._id
}
AggregateRoot.prototype.getTransientEvent = function () {
    return this._transientEvents
}
AggregateRoot.prototype._write = function (domainEvent, encodeType, next) {
 
    this._eventEmmiter.emit(domainEvent.eventName, domainEvent)
    this._eventVersion +=1
    this._version +=1
    next()
}
AggregateRoot.prototype.getVersion = function() {
	return this._version;
};

function enhanceDomainEvent(aggregateRoot,eventName, domainEvent){
    domainEvent.eventName= eventName
    domainEvent.eventVersion= aggregateRoot._eventVersion
    domainEvent.aggregateId = aggregateRoot._id
    domainEvent.eventId = uuid.v1()
}