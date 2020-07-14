# Cqrs-sample-nodejs

## Built by Adewumi Sunkanmi
A complete and simple implementation of CQRS with Event Sourcing all in nodejs by Adewumi Sunkanmi
[https://github.com/Giftedcooperation/Cqrs-sample-nodejs](https://github.com/Giftedcooperation/Cqrs-sample-nodejs).

## Build

> using npm
```sh
   npm install
   npm start
```
> using yarn
```sh
   yarn
   yarn start
```

This sample was created so that every nodejs developer can find a boostraped version of CQRS + EVENT SOURCING to help them understand the basic concept of it, as CQRS + Event-sourcing is playing a great role in mordern applications expecially microservices. A lot of inbuilt node modules was used to get started easily for example the Aggregator is an Event Emmiter, to trigger command handlers and also a Writable Stream Which is used by the eventstrore to replay the events to the current state,also the Report Aggregators are also Writable streams so that the message bus can write newly emitted events to it and then handled by the concerned handlers. 

## Licence

Any developer has the authority to clone this repo for personal use but if any adjustment is to be made, he or she must be a cntributor to this project
