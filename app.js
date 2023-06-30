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

//for Product Types
app.get("/productTypes/:categoryId", async (req, res) => {
  let categoryId = Number(req.params.categoryId);
  let prodCatId = Number(req.query.prodCatId);
  if (prodCatId) {
    query = {
      category_id: categoryId,
      productCategory_id: prodCatId,
    };
  } else {
    query = { category_id: categoryId };
  }
  let collection = "productType";
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

//for products
app.get("/products/:categoryId", async (req, res) => {
  let categoryId = Number(req.params.categoryId);
  let prodCatId = Number(req.query.prodCatId);
  let prodTypeId = Number(req.query.prodTypeId);

  //prodCatId + prodTypeId
  if (prodCatId && prodTypeId) {
    query = {
      category_id: categoryId,
      productCategory_id: prodCatId,
      productType_id: prodTypeId,
    };
  }
  //prodCatId
  else if (prodCatId) {
    query = {
      category_id: categoryId,
      productCategory_id: prodCatId,
    };
  }
  //prodCatId + prodTypeId
  else if (prodTypeId) {
    query = {
      category_id: categoryId,
      productType_id: prodTypeId,
    };
  }
  //categoryId
  else if (categoryId) {
    query = {
      category_id: categoryId,
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
  let lcost = Number(req.query.lcost);
  let hcost = Number(req.query.hcost);
  let brand = req.query.brand;
  let color = req.query.color;
  let fabric = req.query.fabric;
  let pattern = req.query.pattern;
  let occasion = req.query.occasion;
  let necktype = req.query.necktype;
  let lengthtype = req.query.lengthtype;
  let closure = req.query.closure;
  let idealfor = req.query.idealfor;
  let connectivity = req.query.connectivity;
  let size = req.query.size;
  let material = req.query.material;
  let type = req.query.type;
  let author = req.query.author;
  let publisher = req.query.publisher;

  //cost
  if (lcost && hcost) {
    query = {
      category_id: categoryId,
      $and: [{ cost: { $gt: lcost, $lt: hcost } }],
    };
  }
  //brand
  else if (brand) {
    query = {
      category_id: categoryId,
      "product_details.brand": brand,
    };
  }
  //color
  else if (color) {
    query = {
      category_id: categoryId,
      "product_details.Color": color,
    };
  }
  //fabric
  else if (fabric) {
    query = {
      category_id: categoryId,
      "product_details.Fabric": fabric,
    };
  }
  //pattern
  else if (pattern) {
    query = {
      category_id: categoryId,
      "product_details.Pattern": pattern,
    };
  }
  //occasion
  else if (occasion) {
    query = {
      category_id: categoryId,
      "product_details.Occasion": occasion,
    };
  }
  //necktype
  else if (necktype) {
    query = {
      category_id: categoryId,
      "product_details.Neck_Type": necktype,
    };
  }
  //lengthtype
  else if (lengthtype) {
    query = {
      category_id: categoryId,
      "product_details.Length_Type": lengthtype,
    };
  }
  //closure
  else if (closure) {
    query = {
      category_id: categoryId,
      "product_details.Closure": closure,
    };
  }
  //ideal for
  else if (idealfor) {
    query = {
      category_id: categoryId,
      "product_details.Ideal_for": idealfor,
    };
  }
  //connectivity
  else if (connectivity) {
    query = {
      category_id: categoryId,
      "product_details.Connectivity": connectivity,
    };
  }
  //size
  else if (size) {
    query = {
      category_id: categoryId,
      size: size,
    };
  }
  //material
  else if (material) {
    query = {
      category_id: categoryId,
      "product_details.Material": material,
    };
  }
  //type
  else if (type) {
    query = {
      category_id: categoryId,
      "product_details.Type": type,
    };
  }
  //author
  else if (author) {
    query = {
      category_id: categoryId,
      "product_details.Author": author,
    };
  }
  //publisher
  else if (publisher) {
    query = {
      category_id: categoryId,
      "product_details.Publisher": publisher,
    };
  }
  //categoryId
  else if (categoryId) {
    query = {
      category_id: categoryId,
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
  let query = { item_id: id };
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
    let query = { item_id: { $in: req.body.id } };
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
