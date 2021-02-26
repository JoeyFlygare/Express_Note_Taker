const path = require("path");


function htmlRoutes(app){
    //GET `/notes` - Returns the `notes.html` file
    app.get("/notes", function(req, res){
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
    //GET `*` - Returns the `index.html` file
    app.get("*", function(req,res){
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
}


module.exports = htmlRoutes;