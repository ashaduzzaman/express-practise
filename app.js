const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// express app
const app = express();

// db connection
const dbURI =
  "mongodb+srv://ovi:ovi123@expressjs.vonry.mongodb.net/expressjs-tut?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((results) => app.listen(3000))
  .catch((err) => console.log(err));

// registering view engine ejs

app.set("view engine", "ejs");

// mongoose & mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog",
    snippet: "details about my blog",
    body: "more details my blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});
app.get("/", (req, res) => {
  const blogs = [
    { title: "abc", body: "ahdadh" },
    { title: "cdr", body: "ashdhga" },
    { title: "cdr", body: "ashdhga" },
    { title: "cdr", body: "ashdhga" },
  ];
  res.render("index", {
    title: "Home",
    blogs,
  });
});

app.get("/about", (req, res) => {
  //   res.send("<p>Home page</p>");
  res.render("about");
});

//redirect

// 404 not found

app.use((req, res) => {
  res.status(404).render("404");
});
