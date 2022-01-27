'use strict';

const app = require( 'express' )();
const path = require('path');

// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
} );


app.get('/carte', function(req, res) {

    let dataCarte = require('../public/data/geojson.json')
    res.json({dataCarte});
});


// Export our API
module.exports = app;

