import express from "express";
import db from "../db/connection.js";
import { ObjectId, ProfilingLevel } from "mongodb";
import user from "./user.js";
import posts from "./posts.js";

const router = express.Router();

/*
myUserID: userID
myName: name
myLocation: location
myBio: Bio/Info
myPost: posts []
myJoinedPosts: joinedPosts []
*/


// 




// This route is for updating basic user info: Name, bio, location, profile pic, 
router.patch("/profile/:id/update", async (req, res) => {
    try {
      const query = { myUserID: req.params.userID };
      const updates = {
        $set: {
          name: req.body.name,
          myBio: req.body.bio,
          myLocation: req.body.location,
        },
      };
  
      let collection = await db.collection("profiles");
      let result = await collection.updateOne(query, updates);
      res.send(result).status(200);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating profile information");
    }
  });
  
