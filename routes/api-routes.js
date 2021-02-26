const fs = require ("fs");
const path = require("path");
let db = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8");
db = JSON.parse(db)

function apiRoutes(app){
    //GET `/api/notes` - Read the `db.json` file and return all saved notes as JSON
    app.get("/api/notes", function(req, res) {
        console.log(db)
        res.json(db);
    });
    
    //Get '/api/notes/:id' - Displays the note
    app.get("/api/notes/:id", function(req, res){
        res.json(data[Number(req.params.id)]);
    });

    
   //POST `/api/notes` - Receives a new note to save on the request body, add it to 
   //the `db.json` file, and then return the new note to the client.
    app.post("/api/notes", function(req,res){
        const newNote = req.body;
        let noteId = newNote.title+Math.floor(Math.random()*10);
        newNote.id = noteId;
        db.push(newNote);
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(db), function(err){
            res.json(db);
            console.log("Note Added");
        });
    });

    //DELETE `/api/notes/:id` - Receives a query parameter containing the id of a note to delete. 
    app.delete("/api/notes/:id", function(req,res){
        const deleteNote = req.params.id;
        let savedNotes = [];
        for (let i = 0; i < db.length; i++) {
               if(db[i].id !== deleteNote){
                   savedNotes.push(db[i])
               }        
        }
        db=[...savedNotes]
        
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(savedNotes), function(err){
            if (err) throw (err);
            res.send("Note Deleted");
            console.log("Note Deleted");
        });

    })};


module.exports = apiRoutes;