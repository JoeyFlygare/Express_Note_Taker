const fs = require('fs');
const path = require('path');
let db = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf-8');
db = JSON.parse(db)

function apiRoutes(app) {
    app.get('/api/notes/:id', function (req, res) {
        res.json(db);
    });

    app.get('/api/notes.:id', function (req, res) {
        res.json(data[Number(req.params.id)]);
    });

    app.post('/api/notes', function (req, res) {
        const newNotes = req.body;
        let notesId = newNotes.title + Math.floor(Math.random() * 10);
        newNotes.id = notesId;
        db.push(newNotes);
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(db), function (err) {
            res.json(db);
        });
    });

    app.delete('/api/notes.:id', function (req, res) {
        const removeNote = req.params.id;
        let savedNotes = [];
        for (let i = 0; i < db.length; i++) {
            if (db[i].id !== removeNote) {
                savedNotes.push(db[i])
            }
        }

        db = [...savedNotes]

        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(savedNotes), function (err) {
            if (err) throw (err);
            res.send('Deleted Notes!');
        });
    });
}