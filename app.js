const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const homeStartingContent = "home ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const aboutContent = "about ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const contactContent = "contact ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];


app.get('/', function (req, res) {
    res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
    });
    console.log(posts);
})


app.get('/about', function (req, res) {
    res.render("about", { aboutContent: aboutContent });
})


app.get('/contact', function (req, res) {
    res.render("contact", { contactContent: contactContent });
})

app.get('/compose', function (req, res) {
    res.render("compose");
})

app.post('/compose', function (req, res) {
    const post = {
        title: req.body.newItem,
        content: req.body.postBody
    };

    posts.push(post);
    res.redirect('/');



})


app.get('/posts/:postName', function (req, res) {
    const requestedTitle = _.lowerCase(req.params.postName);


    posts.forEach(function (post) {
        const storedTitle = _.lowerCase(post.title);


        if (storedTitle === requestedTitle) {
           res.render("post", {
              title : post.title ,
              content :  post.content
           });
        }
    });
});



app.listen(3000, function () {
    console.log('listening on port 3000');
});