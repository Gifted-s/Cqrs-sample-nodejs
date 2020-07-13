# Cqrs-sample-nodejs

A complete and simple implementation of CQRS with Event Sourcing all in nodejs
[https://github.com/Giftedcooperation/Cqrs-sample-nodejs](https://github.com/Giftedcooperation/Cqrs-sample-nodejs).

## Build

```
   npm install
   npm start
```

This sample was created so that every nodejs developer can find a boostraped version of CQRS + EVENT SOURCING to help them understand the basic concept of it. Also, a lot of inbuilt node modules was used to get started easily for example the Aggregator is an Event Emmiter, to trigger event handlers and also Writable Stream Which is used by the eventstrore to replay the events to the current state,also the Report Aggregators are also writable streams so that the message bus can write newly emitted events to it and then handled by the concerned handlers. 

## Licence

Any developer has the authority to clone this repo for personal use but if any adjustment is to be made, he or she must be a cntributor to this project
