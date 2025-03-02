import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

import user from "./user.js";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.collection("posts");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
  });

  // This section will help you get a single record by id
router.get("/:id", async (req, res) => {
    let collection = await db.collection("posts");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });

  // This section will help you create a new record.
router.post("/", async (req, res) => {
    try {
      const userCollection = await db.collection("users");
      const user = await userCollection.findOne({ _id: new ObjectId(req.body.userId) });
      if (!user) {
        return res.status(404).send("User not found")};

      let newDocument = {
        name: req.body.name,
        location: req.body.location,
        date: req.body.date,
        time: req.body.time,
        listerId: req.body.userId,
        participants: [],
      };
      let collection = await db.collection("posts");
      let result = await collection.insertOne(newDocument);
      res.send(result).status(204);
      // res.status(201).send(result);
    } catch (err) {
      console.error(err);
      /*
      console.log(newDocument.name);
      console.log(newDocument.location);
      console.log(newDocument.date);
      console.log(newDocument.time);
      console.log(newDocument.lister._id);
      console.log(newDocument.lister.name);
      */
      res.status(500).send("Error adding posts");
    }
  });

  // This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
    try {
      const query = { _id: new ObjectId(req.params.id) };
      const updates = {
        $set: {
            name: req.body.name,
            location: req.body.location,
            date: req.body.date,
            time: req.body.time,
            lister: { user_id: user._id, user_name: user.name },
            participants: [],
        },
      };
      res.send(result).status(200);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating posts");
    }
  });
  
  // This section will help you delete a record
  router.delete("/:id", async (req, res) => {
    try {
      const query = { _id: new ObjectId(req.params.id) };
  
      const collection = db.collection("posts");
      let result = await collection.deleteOne(query);
  
      res.send(result).status(200);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting posts");
    }
  });

  router.patch("/:id/add-participant", async (req, res) => {
    try {
      //console.log('User ID:', req.body.user._id);
      const user = await db.collection('users').findOne( {_id: new ObjectId(req.body.user._id)});
      if (!user) {
        return res.status(404).send(`User not found: ${req.body.user._id}`);
      }
      await db.collection('posts').updateOne( 
        //{_id: new ObjectId(req.params.id)},
        {_id: new ObjectId(req.params.id)},
        { $push: { participants: user} }
      );
      res.status(200).send("Participant added to post");
    }
    catch(err){
      res.status(500).send("Error adding user to participants");
    }
  });
  
export default router;
  