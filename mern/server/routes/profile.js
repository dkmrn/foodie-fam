import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
import user from "./user.js";
import posts from "./posts.js";

const router = express.Router();

/*
myUser: user
myName: name
myLocation: location
myBio: Bio/Info
myPost: posts []
myJoinedPost: joinedPosts []
*/
router.post("/", async (req, res) => {
    try {
        const userCollection = await db.collection("users");
        const user = await userCollection.findOne({ _id: new ObjectId(req.body.myUser._id) });
        if (!user) {
            return res.status(404).send("User not found");
        }

        let newDocument = {
            myUser: user,
            myName: req.body.name,
            myLocation: req.body.location,
            myBio: req.body.bio,
            myPosts: [],
            myJoinedPosts: []
        };

        let collection = await db.collection("profiles");
        let result = await collection.insertOne(newDocument);
        let profile = await collection.findOne({ _id: result._id });
        res.send(profile);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding profile");
    }
});


export default router;

