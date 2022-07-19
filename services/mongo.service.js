const { MongoClient } = require("mongodb");
const config = require("../config/db.config");

const mongoService = {
  db: undefined,
  connect: callback => {
    const uri = `${config.mongodb.prefix}${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.server}/`
    //const uri = `${config.mongodb.prefix}${config.mongodb.server}/${config.mongodb.db}` 
    MongoClient.connect(uri, function(err, data) {
      if (err) {
        console.log(`Connected to database failed due to ${err}`);
        callback(err);
      }
      mongoService.db = data;
      console.log("Successfully connected to MongoDB");
      callback(null);
    });
  },
  initialize: callback => {
    db = mongoService.db.db(config.mongodb.db)
    if (!db.listCollections({name: 'profile'}).hasNext()){
          db.createCollection("profile", function(err, res) {
            if (err) throw err;
            console.log("Collection created!");
          });
       }else{
         console.log("Collection already present hence skipping creation!");
       }
  }
};

module.exports = mongoService;