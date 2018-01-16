var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var express = require('express');

// APP CONFIG
var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost/restful_blog_app', { useMongoClient: true });

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now },
});

var Blog = mongoose.model('Blog', blogSchema);

// RESTFUL ROUTES
app.get('/', function (req, res) {
  res.redirect('/blogs');
});

app.get('/blogs', function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) {
      console.log('ERROR');
    } else {
      res.render('index', { blogs: blogs });
    }
  });
});

// SERVER CONFIG
app.listen(3000, function () {
  console.log('Server started on port 3000');
});
