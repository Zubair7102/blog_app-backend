const express = require("express");
const router = express.Router();
// express.Router() is a function in Express.js that creates a new "mini" router or a modular, mountable route handler. Think of it like a mini version of the main Express app, designed to handle a specific group of routes.

// IMPORT THE CONTROLLER
const {dummyLink} = require("../controllers/likeController");


// Mapping Create
router.get("/dummyroute", dummyLink);



// export
module.exports = router;