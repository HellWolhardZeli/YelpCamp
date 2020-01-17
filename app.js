var express = require ('express');
var app = express ();
var parser = require ('body-parser');
var mongoose = require ('mongoose');

mongoose.connect ('mongodb://localhost/YelpCamp', {useNewUrlParser: true});

app.use (parser.urlencoded ({extended: true}));

var campGroundsSchema = new mongoose.Schema ({
  name: String,
  image: String,
  description: String,
});

var campGrounds = mongoose.model ('campGrounds', campGroundsSchema);

app.get ('/', function (req, res) {
  res.render ('home.ejs');
});

app.get ('/campGrounds', function (req, res) {
  campGrounds.find ({}, function (err, campGrounds) {
    if (err) {
      console.log (err);
    } else {
      res.render ('index.ejs', {campGrounds: campGrounds});
    }
  });
});

app.get ('/campGrounds/new', function (req, res) {
  res.render ('new.ejs');
});

app.get ('/campGrounds/:id', function (req, res) {
  campGrounds.findById (req.params.id, function (err, foundCampGround) {
    if (err) {
      console.log (err);
    } else {
      res.render ('show.ejs', {campGrounds: foundCampGround});
    }
  });
});

app.post ('/campGrounds', function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCampGrounds = {name: name, image: image};
  campGrounds.create (newCampGrounds, function (err, campGrounds) {
    if (err) {
      console.log (err);
    } else {
      res.redirect ('/campGrounds');
    }
  });
});

// Starts Server at port 3000
app.listen (3000), function () {
  console.log ('Server has started');
};
