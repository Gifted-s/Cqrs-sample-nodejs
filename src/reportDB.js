const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const client  =new MongoClient('mongodb://127.0.0.1:27017', {useNewUrlParser:true, useUnifiedTopology:true})

const makeDb =async function(){
    if(!client.isConnected()){
        await client.connect()
    }
    return client.db('ReportDB')
}

module.exports =async function (collectionName){
   
    async function insertToDb(data){
        let db = await makeDb()
      const insertedElement = await db.collection(collectionName).insertOne(data)
     
    }
    async function editDb(id, data){
        let db = await makeDb()
    const editedResponse = await db.collection(collectionName).updateOne({id}, {$set:data})
    }

    async function clearDb(){
        let db = await makeDb()
        const editedResponse = await db.collection(collectionName).remove({})
       
        }

    async function getReports(){
    let db = await makeDb()
     const getInventory =  db.collection(collectionName).find({})
     let array = await getInventory.toArray()
     console.log(array,'here is yu')
     return array
    }
    return Object.freeze({
        insertToDb,
        clearDb,
        editDb,
        getReports
    })
}