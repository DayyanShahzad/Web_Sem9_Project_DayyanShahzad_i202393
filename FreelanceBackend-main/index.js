const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Userrouter = require("./Routes/AdminRoutes");
const Customer = require("./models/Customer.schema");
const Freelance = require("./models/Freelance.schema");
const Projects = require("./models/Projects.schema");
const Seller = require("./models/Seller.schema");
const customerData = require('./Data/customerData.js'); // Importing the data correctly
const freelanceData = require('./Data/freelanceData.js');
const projectData = require('./Data/projectData.js');
const sellerData = require('./Data/sellerData.js');

app.use(express.json());
const cors = require("cors");
require("dotenv").config();

// Use CORS middleware
app.use(cors({
    origin: '*',
}));

// Routes
app.use("/user", Userrouter);

// Test route
app.get("/", (req, res) => {
    res.json({ "Message": "Hello" });
});

// Connect to MongoDB and seed data
mongoose.connect(process.env.MONGODB_STRING)
    .then(async () => {
        console.log("Connected to MongoDB");

        // Insert dummy data into the respective collections
        await Customer.insertMany(customerData);
        await Freelance.insertMany(freelanceData);
        await Projects.insertMany(projectData);
        await Seller.insertMany(sellerData);

        console.log("Dummy data inserted successfully.");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB:", err);
    });

// Start the server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
