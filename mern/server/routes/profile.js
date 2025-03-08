import express from "express";
import db from "../db/connection.js";
import { ObjectId, ProfilingLevel } from "mongodb";
import user from "./user.js";
import posts from "./post.js";

const router = express.Router();

/*
myUserId: userId
myName: name
myLocation: location
myBio: Bio/Info
myPost: posts []
myJoinedPosts: joinedPosts []
*/
router.post("/", async (req, res) => {
    console.log("ENTER")
    try {
        const userCollection = await db.collection("users");
        const user = await userCollection.findOne({ _id: new ObjectId(req.body.userId) });
        if (!user) {
            return res.status(404).send(new ObjectId(req.body.userId));
        }


        let newDocument = {
            myUserId: req.body.userId,
            myName: req.body.name,
            myLocation: req.body.location,
            myBio: req.body.bio,
            myPosts: [],
            myJoinedPosts: []
        };
        console.log("NEW DOC")

        let collection = await db.collection("profiles");
        let result = await collection.insertOne(newDocument);
        console.log("INSERT")
        let profile = await collection.findOne({ _id: result._id });
        res.send(profile);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding profile");
    }
});

// This route is for updating basic user info: Name, bio, location, profile pic, 
router.patch("/:id/update", async (req, res) => {
    try {
      const query = { myUserId: req.params.id };
      const updates = {
        $set: {
          myName: req.body.name,
          myBio: req.body.bio,
          myLocation: req.body.location,
        },
      };
  //
      let collection = await db.collection("profiles");
      let result = await collection.updateOne(query, updates);
      res.send(result).status(200);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating profile information");
    }
  });
  
export default router;

