const express = require('express');

const htmlRoute = require('./routes/html-routes');
const apiRoutes = require('./routes/api-routes');

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

htmlRoute(app);
apiRoutes(app);

app.listen(PORT, function(){
    console.log('App listening on PORT ' + PORT);
});