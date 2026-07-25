import express from "express";

import cors from "cors";

import "./config/db.js";

import serviceRoutes from "./routes/serviceRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

import authRoutes from "./routes/authRoutes.js";



const app = express();


app.use(cors());
app.use(express.json());

// Connect the routes
app.use("/api/services", serviceRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/blogs", blogRoutes);

app.use("/api/auth",authRoutes);



app.get("/", (req, res) => {
    res.send("CMS Backend Running...");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
}); 

