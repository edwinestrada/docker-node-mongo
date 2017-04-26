var express = require('express');
var app = express();
var mongoose = require('mongoose');

//DB setup
var db = mongoose.createConnection(process.env.MONGO_URI);
db
  .on('connected', () => console.log(`Connected to MongoDB instance at: ${process.env.MONGO_URI}`))
  .on('disconnecting', () => console.log('Shutting down MongoDB'))
  .on('disconnected', () => console.log('Disconnected MongoDB'))
  .on('error', console.warn);

var LocationSchema = new mongoose.Schema({
  name: {
    type: String
  },
  count: {
    type: Number
  }
});
var Location = db.model('Location', LocationSchema);

app.get('/', function(req, res){
  res.send("Hola Mundo");
  // res.send("Hello World");
});

app.get('/you-ok', sendOkay);

function sendOkay(req, res) {
  res.status(200).json({status: 'up'});
}

app.get('/locations', getLocations);

function getLocations(req, res) {
  console.log('getLocations');
  Location.find(function(err, locations) {
    if(err) console.error(err)
    if(locations) console.log(locations.length)
    return err ?
    res.json({error: err}) :
    res.json({locations: locations});
  });
}

app.listen(3000, function(){
  console.log('Example app listening on port 3000!');
});