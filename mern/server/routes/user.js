import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

import bcrypt from "bcrypt";
const saltRounds = 10;

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /user.
const router = express.Router();

// This section will help you get a list of all the users.
router.get("/", async (req, res) => {
  let collection = await db.collection("users");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single user by id
router.get("/:id", async (req, res) => {
  try {
  let collection = await db.collection("users");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
} catch (err) {
  console.error(err);
  res.status(500).send("Error finding user");
}
  
});


//This section will help you get a single user by email
router.get("/email/:email", async (req, res) => {
  try {
    let collection = await db.collection("users");
    let query = { email: req.params.email };
    let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
} catch (err) {
  console.error(err);
  res.status(500).send("Error finding user");
}
});

// This section will help you create a new user.
router.post("/", async (req, res) => {
  try {
    const myhash = await bcrypt.hash(req.body.password, saltRounds);

    let newDocument = {
      email: req.body.email,
      password: myhash,
    };
    let collection = await db.collection("users");

    let user = await collection.findOne({email: req.body.email});
    if (user) return res.status(400).send("An account with this email already exists.");

    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding user");
  }
});

// This section will help you update a user by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    };

    let collection = await db.collection("users");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// This section will help you delete a user
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("users");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

// Authenticate the user given email and password
router.post("/login", async (req, res) => {
  try {
    let collection = await db.collection("users");
    let query = { email: req.body.email };
    let user = await collection.findOne(query);
 
    if (!user) return res.status(400).send("Please enter a valid email and password.");

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) return res.status(400).send("Please enter a valid email and password.");

    //at this point, login is successful, return the user info without the password info
    user.password = undefined;

    console.log("LOGIN SUCCESS!")

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

export default router;