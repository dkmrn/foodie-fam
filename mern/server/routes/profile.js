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

