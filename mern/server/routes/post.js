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


  //this section will help you get a list of records by restaurant name
  router.get("/name/:name", async (req, res) => {
    let collection = await db.collection("posts");
    let results = await collection.find({ name: { $regex: req.params.name, $options: "i" }}).toArray();;
    res.send(results).status(200);
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
        additionalInfo: req.body.additionalInfo
      };

      let collection = await db.collection("posts");
      let result = await collection.insertOne(newDocument);
      let post = await collection.findOne({ _id: result.insertedId });
      

      let profileCollection = await db.collection("profiles");
      await profileCollection.findOneAndUpdate({ myUserId: req.body.userId }, {$push: {myPosts: (post._id).toString() }});
      
      // profile.myPosts.push(post);
      // await profileCollection.updateOne({ myUserId: req.body.userId }, { $set: { myPosts: profile.myPosts } });
      res.send(post);
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
        },
      };
      let collection = await db.collection("posts");
      let result = await collection.updateOne(query, updates);
      res.send(result).status(200);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating posts");
    }
  });
  
  // This section will help you delete a record
  router.delete("/:id", async (req, res) => {
    try {
      let postCollection = db.collection('posts');
      let post = await postCollection.findOne({_id: new ObjectId(req.params.id)});

      let listerId = post.listerId;
      let participantsIds = post.participants;

      let profileCollection = db.collection('profiles');

      let listerProfile = await profileCollection.findOne({myUserId: listerId});
      let listerPosts = listerProfile.myPosts;
      let index = listerPosts.indexOf(post);
      listerPosts.splice(index,1);
      await profileCollection.updateOne(
        {myUserId: listerId},
        {$set: {myPosts: listerPosts}});

      for(let i = 0; i < participantsIds.length; i++){
        let participantId = participantsIds[i];
        let participantProfile = await profileCollection.findOne({myUserId: participantId});
        let participantPosts = participantProfile.myJoinedPosts;
        index = participantPosts.indexOf(post);
        participantPosts.splice(index,1);
        await profileCollection.updateOne(
          {myUserId: participantId},
          {$set: {myJoinedPosts: participantPosts}});
      }
      
      let result = await postCollection.deleteOne(post);
  
      res.send(result).status(200);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting posts");
    }
  });

  router.patch("/:id/add-participant", async (req, res) => {
    try {
      console.log('Post ID:', req.params.id);
      console.log('User ID:', req.body.userId);
      
      // First check if user exists
      const userCollection = db.collection('users');
      const user = await userCollection.findOne({_id: new ObjectId(req.body.userId)});
      if (!user) {
        return res.status(404).send(`User not found: ${req.body.userId}`);
      }
      
      // Update the post to add the participant
      const postCollection = db.collection('posts');
      const updatePostResult = await postCollection.updateOne( 
        {_id: new ObjectId(req.params.id)},
        { $push: { participants: req.body.userId } }
      );
      
      if (updatePostResult.matchedCount === 0) {
        return res.status(404).send(`Post not found: ${req.params.id}`);
      }
      
      // Update the user's profile to add the joined post
      const profileCollection = db.collection('profiles');
      const updateProfileResult = await profileCollection.updateOne(
        { myUserId: req.body.userId },
        { $push: { myJoinedPosts: req.params.id } }
      );
      
      if (updateProfileResult.matchedCount === 0) {
        console.log(`Profile not found for user: ${req.body.userId}`);
        // Continue anyway as the post was updated
      }
      
      res.status(200).json({ message: "Participant added to post" });
    }
    catch(err) {
      console.error("Error adding participant:", err);
      res.status(500).send("Error adding user to participants");
    }
  });

  router.patch("/:id/remove-participant", async (req, res) => {
    try {

      let profileCollection = db.collection('profiles');
      let user = await profileCollection.findOne( {myUserId: req.body.userId});
      if (!user) {
        return res.status(404).send(`Profile not found: ${req.body.userId}`);
      }
      console.log("FOUND USER")

      let userPosts = user.myPosts;

      let postCollection = db.collection('posts');
      let post = await postCollection.findOne({_id: new ObjectId(req.params.id)})
      if (!post) {
        return res.status(404).send(`Post not found: ${req.params.id}`)
      }

      let postParticipants = post.participants;

      let indexOfUser = postParticipants.indexOf(req.body.userId);

      postParticipants.splice(indexOfUser, 1);

      await postCollection.updateOne(
        {_id: new ObjectId(req.params.id)},
        {$set: {participants: postParticipants}}
      );

      
      let usersPosts = user.myJoinedPosts;

      let indexOfPost = usersPosts.indexOf(req.params.id);

      usersPosts.splice(indexOfPost, 1);

      await profileCollection.updateOne(
        {myUserId: req.body.userId},
        {$set: {myJoinedPosts: usersPosts}}
      );

      res.status(200).send("Participant removed from post");
    }
    catch(err){
      res.status(500).send("Error removing participant.");
    }
  });
  
export default router;
  