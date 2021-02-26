//Dependencies
//==============================
const express = require("express");

//Routes
//==============================
const htmlRoutes = require("./routes/html-routes.js");
const apiRoutes = require("./routes/api-routes.js");

// Sets up the Express App
// =============================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Sets up the Express App to allow access to public folder
//=============================
app.use(express.static("public"));

//Calls the routes
//==========================
apiRoutes(app);
htmlRoutes(app);
 
//Starts the server to begin listening 
//==============================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });