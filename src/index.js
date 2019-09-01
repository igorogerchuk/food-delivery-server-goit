const express = require("express");
const corsMiddleware = require("cors");
const products = require("./db/products/all-products.json");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(corsMiddleware());

app.get("/", (req, res) => {
  res.status(200).send("Homepage");
});

app.get("/products", (req, res) => {
  res.status(200).send(products);
});

app.post("/signup", (req, res) => {
  let userName = req.body.username;
  fs.writeFile(
    path.resolve(__dirname, "db/users", userName + ".json"),
    JSON.stringify(req.body),
    function(err) {
      if (err) throw err;
      console.log("File is created successfully.");
    }
  );
  res.status(201).send({
    status: "success",
    user: req.body
  });
});

app.use((req, res, next) => {
  let err = new Error("page not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.message);
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
