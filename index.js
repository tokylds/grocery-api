const express = require("express");
const bodyParser = require("body-parser");
const uuidv4 = require("uuid/v4");
const fs = require("fs");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const DAL = require("./dataAccessLayer");
const ObjectId = require("mongodb").ObjectId;

require("dotenv").config();

app.use(bodyParser.json());

DAL.Connect();

// const mongodbUsername = process.env.MONGODB_USERNAME;
// console.log("mongodbUsername: " + mongodbUsername);

//await dataAccessLayer.Connect();

// const products = require("./products.json");

// const products = [
//   {
//     name: "Eggs",
//     price: 1.99
//   },
//   {
//     name: "Milk",
//     price: 1.49
//   },
//   {
//     name: "Bread",
//     price: 0.99
//   },
//   {
//     name: "Sausage",
//     price: 3.56
//   },
//   {
//     name: "Biscuit",
//     price: 4.57
//   }
// ];

//Get all products endpoint.

app.get("/api/products", cors(), async function(req, res) {
  // const result = Object.values(products);
  const result = await DAL.Find();

  res.send(result);
});

//Get 1 product by ID endpoint.

app.get("/api/products/:id", cors(), async function(req, res) {
  const id = req.params.id;
  // const p = products[id];

  const product = {
    _id: ObjectId(id)
  };

  const result = await DAL.Find(product);

  if (result) {
    res.send(result);
  } else {
    res.send("No product with ID: " + id + " found!");
  }
});

app.delete("/api/products/:id", cors(), async function(req, res) {
  const id = req.params.id;

  // delete products[id];

  const product = {
    _id: ObjectId(id)
  };

  const result = await DAL.Delete(product);

  res.send("Product deleted successfully!");
});

app.put("/api/products/:id", cors(), async function(req, res) {
  const id = req.params.id;
  const newProduct = req.body;

  // const product = products[id];

  const updatedProduct = {
    $set: newProduct
  };

  const product = {
    _id: ObjectId(id)
  };

  if (product) {
    // if (newProduct.name && newProduct.price > 0) {
    //   product.name = newProduct.name;
    //   product.price = newProduct.price;

    //   const json = JSON.stringify(products);
    //   fs.writeFile("./products.json", json, () => {});
    //   res.send();
    // } else {
    //   res.send("New product is missing required parameters!");
    // }
    const result = await DAL.Update(product, updatedProduct);
    res.send(result);
  } else {
    res.send("No product with ID: " + id + "found!");
  }
});

app.post("/api/products", cors(), async function(req, res) {
  const product = req.body;

  if (product.name && product.price > 0) {
    // let id = uuidv4();

    // while (products[id]) {
    //   id = uuidv4();
    // }

    // product.id = id;

    // products[id] = product;

    // const json = JSON.stringify(products);

    // fs.writeFile("./products.json", json, () => {});

    await DAL.Insert(product);

    res.send("Success");
  } else {
    res.send("Fail");
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
