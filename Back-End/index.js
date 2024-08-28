import express from "express";

import mysql2 from "mysql2";

import cors from 'cors' ;

// const express = require("express");
// const mysql2 = require("mysql2");
let app = express();
const port = 3001;
// const cors = require('cors') 
let query = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fullstack",
});

app.use(express.json());
app.use(cors())
// ===== GET =====   get all products

app.get("/", (req, res) => {
  query.execute("SELECT * FROM products", (err, data) => {
    if (err) {
     
      res.send({
        err
      }); 
    } else {
      res.send({
        message : "success" ,
         data
      }); 
      
    }
  });
});

//  ======  POST  ======== add single product

app.post("/product", (req, res) => {
  let { name, price, description } = req.body;
  query.execute(
    `insert into products (name,price,description) values ('${name}','${price}','${description}')`,
    (err) => {
      if (err) {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
      } else {
        res.send({
          message: "success",
        });
        console.log("product added successfully");
      }
    }
  );
});

// === GET =====    get single product

app.get("/product/:id", (req, res) => {
  console.log("====================================");
  console.log(req.params);
  console.log("====================================");

  let { id } = req.params;
  query.execute(`select * from products WHERE id = ${id}`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

// ==== DELETE  ===== delet single product

app.delete("/product", (req, res) => {
  let { id } = req.body;

  query.execute(`delete from products where id = ${id} `, (err) => {
    if (err) {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
    } else {

      res.send({
        message: "success",
      });
    }
  });
});

// ==== PUT  =====  updata single product

app.put("/product", (req, res) => {
  let { id, name, price, description } = req.body;
  query.execute(
    `update products  set name='${name}',price='${price}',description='${description}'  Where id =${id}`
  );
  res.send({
    message: "success",
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
