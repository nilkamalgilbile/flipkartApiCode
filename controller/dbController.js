let mongo = require("mongodb");
let { MongoClient } = require("mongodb");
//let mongoUrl = "mongodb://127.0.0.1:27017";
let mongoUrl =
  "mongodb+srv://nilkamalgilbile:g7hiTJVeIvr0OzcT@cluster1.0brl6u0.mongodb.net/?retryWrites=true&w=majority";
let client = new MongoClient(mongoUrl);

async function dbConnect() {
  await client.connect();
}

let db = client.db("flipkart");

//getData
async function getData(colName, query) {
  let output = [];
  try {
    const cursor = db.collection(colName).find(query);
    for await (const data of cursor) {
      output.push(data);
    }
    cursor.closed;
  } catch (err) {
    output.push({ Error: "Error in getData" });
  }
  return output;
}

//postData
async function postData(colName, data) {
  let output;
  try {
    output = await db.collection(colName).insertOne(data);
  } catch (err) {
    output = { response: "Error in postData" };
  }
  return output;
}

//updateOrder
async function updateOrder(colName, condition, data) {
  let output;
  try {
    output = await db.collection(colName).updateOne(condition, data);
  } catch (err) {
    output = { response: "Error in update data" };
  }
  return output;
}

//deleteOrder
async function deleteOrder(colName, condition) {
  let output;
  try {
    output = await db.collection(colName).deleteOne(condition);
  } catch (err) {
    output = { response: "Error in delete data" };
  }
  return output;
}

module.exports = {
  dbConnect,
  getData,
  postData,
  updateOrder,
  deleteOrder,
};
