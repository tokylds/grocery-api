const MongoClient = require("mongodb").MongoClient;
// const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

const mongoDbUrl = process.env.MONGODB_URL;

const databaseName = "grocery-db";

const collectionName = "products";

const settings = {
  useUnifiedTopology: true
};

console.log("mongoDbUrl:" + mongoDbUrl);

let database;

//CONNECT TO DATABASE
const Connect = function() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(mongoDbUrl, settings, function(err, client) {
      if (err) {
        reject(err);
      } else {
        console.log("SUCCESSFULLY CONNECTED TO DATABASE!");
        database = client.db(databaseName);
        resolve();
      }
    });
  });
};

//INSERT DOCUMENTS
const Insert = function(product) {
  return new Promise((resolve, reject) => {
    const productCollection = database.collection(collectionName);

    productCollection.insertOne(product, function(err, res) {
      if (err) {
        reject(err);
      } else {
        console.log("SUCCESSFULLY INSERTED A NEW DOCUMENT");
        resolve(res);
      }
    });
  });
};

//FIND PRODUCTS
const Find = function(product) {
  let productQuery = {};

  if (product) {
    productQuery = product;
  }

  return new Promise((resolve, reject) => {
    const productCollection = database.collection(collectionName);

    productCollection.find({}).toArray(function(err, res) {
      if (err) {
        reject(err);
      } else {
        console.log("SUCCESSFULLY FOUND ALL DOCUMENTS");
        resolve(res);
      }
    });
  });
};

//UPDATE DOCUMENT
const Update = function(product, newProduct) {
  return new Promise((resolve, reject) => {
    const productCollection = database.collection(collectionName);

    productCollection.updateOne(product, newProduct, function(err, res) {
      if (err) {
        reject(err);
      } else {
        console.log("SUCCESSFULLY UPDATED DOCUMENT");
        resolve(res);
      }
    });
  });
};

//DELETE DOCUMENTS
const Delete = function(product) {
  return new Promise((resolve, reject) => {
    const productCollection = database.collection(collectionName);

    productCollection.deleteOne(product, function(err, res) {
      if (err) {
        reject(err);
      } else {
        console.log("SUCCESSFULLY DELETED DOCUMENT");
        resolve(res);
      }
    });
  });
};

//UPDATE DOCUMENTS
// MongoClient.connect(mongoDbUrl, function(err, client) {
//   if (err) throw err;
//   // var dbo = db.db("mydb");
//   const productCollection = database.collection("products");
//   var myquery = { name: "2% Milk" };
//   var newvalues = { $set: { name: "3% Milk", price: 3.99 } };
//   database
//     .collection("products")
//     .updateOne(myquery, newvalues, function(err, res) {
//       if (err) throw err;
//       console.log("1 document updated");
//       client.close();
//     });
// });

//DELETE DOCUMENT
// MongoClient.connect(mongoDbUrl, function(err, client) {
//   if (err) throw err;
//   // var dbo = db.db("mydb");
//   const productCollection = database.collection("products");
//   var myquery = { name: "Eggs" };
//   database.collection("products").deleteOne(myquery, function(err, res) {
//     if (err) throw err;
//     console.log("1 document deleted");
//     client.close();
//   });
// });

// MongoClient.connect (mongoDbUrl, function(err, client))

// MongoClient.connect(mongoDbUrl, settings, function(err, client) {
//   if (err) {
//     console.log("ERROR: " + err);
//   } else {
//     database = client.db(databaseName);
//     const productCollection = database.collection("products");

//     productCollection.find().toArray(function(err, docs) {
//       if (err) {
//         console.log("ERROR: " + err);
//       } else {
//         docs.forEach(d => {
//           console.log(d);
//         });
//       }
//     });
//   }
// });

// const promise = Connect();
// // console.log(promise);

// promise.then(() => {
//   console.log("Promise finished successfully!");

//   const product = {
//     name: "Car oil filter",
//     price: 4.86
//   };

//   // Insert(product)
//   //   .then(res => {
//   //     console.log("Successfully inserted new document");
//   //     //if we get here, we inserted the new product in the db
//   //   })
//   //   .catch(err => {});

//   // Delete(product)
//   //   .then(res => {
//   //     console.log("Successfully deleted document");
//   //     //if we get here, we inserted the new product in the db
//   //   })
//   //   .catch(err => {});

//   // find()
//   //   .then(res => {
//   //     console.log(res);
//   //   })

//   //   .catch(err => {
//   //     console.log("Promise finished with an error");
//   //   });

//   const newProduct = {
//     $set: {
//       name: "5% Milk"
//     }
//   };

//   update(product, newProduct).then(res => {
//     console.log("SUCCESSFULLY PRODUCT UPDATE");
//   });
// });

//allow anyone else to use this file
module.exports = { Connect, Insert, Find, Update, Delete };
