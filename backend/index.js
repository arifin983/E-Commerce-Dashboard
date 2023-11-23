require("./db/config");
const userSchemaModel = require("./db/user");
const productSchema = require("./db/Product");
const verifyToken = require("./token")
const jwt = require("jsonwebtoken");
const jwkKey = "e-comm";
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.post("/register", async (req, resp) => {
  let userData = new userSchemaModel(req.body);
  let result = await userData.save();
  result = result.toObject();
  delete result.password;
  jwt.sign({ result }, jwkKey, (err, token) => {
    if (err) {
      resp.send({ result: "went some thing wrong try some time later" });
    }
    resp.send({ result, auth: token });
  });
});
app.post("/login", async (req, resp) => {
  console.log(req.body);
  if (req.body.email && req.body.password) {
    let user = await userSchemaModel.findOne(req.body).select("-password");
    if (user) {
      jwt.sign({ user }, jwkKey, (err, token) => {
        if (err) {
          resp.send({ result: "went some thing wrong try some time later" });
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send({ result: "No user found" });
    }
  } else {
    resp.send({ result: "No user found" });
  }
});
app.post("/addProduct", verifyToken, async (req, resp) => {
  let productData = new productSchema(req.body);
  let result = await productData.save();
  resp.send(result);
});
app.get("/products", verifyToken, async (req, resp) => {
  let products = await productSchema.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "No products found" });
  }
});
app.delete("/deleteProduct/:id", verifyToken, async (req, resp) => {
  let result = await productSchema.deleteOne({ _id: req.params.id });
  resp.send(result);
});
app.get("/editProduct/:id",verifyToken, async (req, resp) => {
  let result = await productSchema.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No recode " });
  }
});
app.put("/updateProduct/:id", verifyToken, async (req, resp) => {
  let result = await productSchema.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});
app.get("/search/:key",verifyToken, async (req, resp) => {
  let result = await productSchema.find({
    $or: [
      { name: { $regex: req.params.key } },
      { price: parseInt(req.params.key) },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});


app.listen(4000);
