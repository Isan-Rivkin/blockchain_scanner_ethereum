const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const constants = require('../constants');

const db_name = constants.DB;
const entities_collection = constants.ENTITIES_COLLECTION;
const url = constants.DB_CONNECTION_STRING;

// Use connect method to connect to the server
var connect = function(callback){
    MongoClient.connect(url, function(err, client) {
        console.log("Connected successfully to server");
        const db = client.db(db_name);
        callback(db,client);
    });
}
/* ADD OPERATION */

var insertDocuments = function(db,client,items_list, callback) {
    // Get the documents collection
    const collection = db.collection(entities_collection);
    // Insert some documents
    collection.insertMany(items_list, function(err, result) {
        console.log("Inserted "+items_list.length+" documents into the collection");
        client.close();
        callback(result);
    });
};

module.exports.insert_entities = function(entities,callback){
    connect((db,client)=>{
        insertDocuments(db,client,entities,callback);
    });
};

/* UPDATE OPERATION */

var updateDocument = function(db,client,entity, callback) {
    // Get the documents collection
    const collection = db.collection(entities_collection);
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ address : entity.address }
        , { $set: { type : entity.type, comment : entity.comment, good : entity.good , interesting : entity.interesting} }, function(err, result) {
            console.log("Updated entity.");
            client.close();
            callback(result);
        });
}
module.exports.update_entity = function(entity,callback){
    connect((db,client)=>{
        updateDocument(db,client,entity,callback);
    });
}

/* DELETE OPERATION */

var removeDocument = function(db,client, entity,callback) {
    // Get the documents collection
    const collection = db.collection(entities_collection);
    collection.deleteOne({ address : entity.address }, function(err, result) {
        console.log("Removed from db");
        client.close();
        callback(result);
    });
};

module.exports.remove_entity = function(entity,callback){
    connect((db,client)=>{
        removeDocument(db,client,entity,callback);
    });
};

/* LIST OPERATION */

var findDocuments = function(db,client, callback) {
    // Get the documents collection
    const collection = db.collection(entities_collection);
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        client.close();
        callback(docs);
    });
};
module.exports.list_entity = function(callback){
    connect((db,client)=>{
        findDocuments(db,client,callback);
    });
};
