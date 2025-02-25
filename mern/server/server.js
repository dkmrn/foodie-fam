import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import users from "./routes/user.js";
import posts from "./routes/posts.js";

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();


app.use(cors());
app.use(express.json());
app.use("/record", records);
app.use("/user", users);
app.use("/posts", posts);


// // Enable CORS for requests from localhost:5173
// app.use(cors({
//   origin: "http://localhost:5173", // Allows only localhost:5173 to access your server
//   methods: ["GET", "POST", "PATCH", "DELETE"], // Allowed methods
//   allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
// }));

// // Your other middleware and routes go here

// app.listen(5050, () => {
//   console.log("Server running on http://localhost:5050");
// });


// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
