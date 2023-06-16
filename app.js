let express = require("express");
let app = express();
let port = process.env.PORT || 9120;
let Mongo = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");
let {
  dbConnect,
  getData,
  postData,
  updateOrder,
  deleteOrder,
} = require("./controller/dbController");

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hiii From express");
});

//for all category
app.get("/category", async (req, res) => {
  let query = {};
  let collection = "category";
  let output = await getData(collection, query);
  res.send(output);
});

//for Fashion
app.get("/fashion", async (req, res) => {
  let query = { category_id: 3 };
  let collection = "productType";
  let output = await getData(collection, query);
  res.send(output);
});

//for Electronics
app.get("/electronics", async (req, res) => {
  let query = { category_id: 4 };
  let collection = "productType";
  let output = await getData(collection, query);
  res.send(output);
});

//for Home
app.get("/home", async (req, res) => {
  let query = { category_id: 5 };
  let collection = "productType";
  let output = await getData(collection, query);
  res.send(output);
});

//for beauty-toys
app.get("/beauty", async (req, res) => {
  let query = { category_id: 6 };
  let collection = "productType";
  let output = await getData(collection, query);
  res.send(output);
});

//for vehicles
app.get("/vehicles", async (req, res) => {
  let query = { category_id: 7 };
  let collection = "productType";
  let output = await getData(collection, query);
  res.send(output);
});

//for quicksearch
app.get("/quicksearch", async (req, res) => {
  let query = {};
  let collection = "quickSearch";
  let output = await getData(collection, query);
  res.send(output);
});

//products wrt category + cost
app.get("/filter/:categoryId", async (req, res) => {
  let categoryId = Number(req.params.categoryId);
  let lcost = Number(req.query.lcost);
  let hcost = Number(req.query.hcost);
  if (categoryId) {
    query = {
      category_id: categoryId,
    };
  } else if (lcost && hcost) {
    query = {
      category_id: categoryId,
      $and: [{ "products.cost": { $gt: lcost, $lt: hcost } }],
    };
  } else {
    query = {};
  }
  let collection = "product";
  let output = await getData(collection, query);
  res.send(output);
});

//products wrt category + filter
app.get("/filter/:categoryId", async (req, res) => {
  let categoryId = Number(req.params.categoryId);
  let filterId = Number(req.query.filterId);
  if (categoryId) {
    query = {
      category_id: categoryId,
    };
  } else if (filterId) {
    query = {
      category_id: categoryId,
      "filter.filter_id": filterId,
    };
  } else {
    query = {};
  }
  let collection = "product";
  let output = await getData(collection, query);
  res.send(output);
});

//for product details
app.get("/details/:id", async (req, res) => {
  let id = Number(req.params.id);
  let query = { "products.item_id": id };
  let collection = "product";
  let output = await getData(collection, query);
  res.send(output);
});

//for orders
app.get("/orders", async (req, res) => {
  let query = {};
  if (req.query.email) {
    query = { email: req.query.email };
  } else {
    query = {};
  }
  let collection = "orders";
  let output = await getData(collection, query);
  res.send(output);
});

//for placeOrder
app.post("/placeOrder", async (req, res) => {
  let data = req.body;
  let collection = "orders";
  console.log(">>>", data);
  let response = await postData(collection, data);
  res.send(response);
});

//for selected product details
app.post("/productDetails", async (req, res) => {
  if (Array.isArray(req.body.id)) {
    let query = { "products.item_id": { $in: req.body.id } };
    let collection = "product";
    let output = await getData(collection, query);
    res.send(output);
  } else {
    res.send("Please Pass data in form of array");
  }
});

//update
app.put("/updateOrder", async (req, res) => {
  let collection = "orders";
  let condition = { _id: new Mongo.ObjectId(req.body._id) };
  let data = {
    $set: {
      status: req.body.status,
    },
  };
  let output = await updateOrder(collection, condition, data);
  res.send(output);
});

//deleteOrder
app.delete("/deleteOrder", async (req, res) => {
  let collection = "orders";
  let condition = { _id: new Mongo.ObjectId(req.body._id) };
  let output = await deleteOrder(collection, condition);
  res.send(output);
});

app.listen(port, (err) => {
  dbConnect();
  if (err) throw err;
  console.log(`Server is running on port ${port}`);
});
