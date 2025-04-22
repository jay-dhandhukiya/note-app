const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

// index.ejs page ma data ne show karwa
app.get("/", (req, res) => {
     fs.readdir(`./files`, (err, files) => {
          res.render("index", { files: files });
     })
});
// form(create.ejs) ma data ne save karwa
app.post("/create", (req, res) => {
     fs.writeFile(`./files/${req.body.title.split(' ').join('')}`, req.body.note , (err) => {
          res.redirect("/");
     })
});
// file ne readkarwa ma te , show.ejs page ma show karwa
app.get("/files/:filename", (req, res) => {
     fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, data) => {
          res.render("show", { title: req.params.filename, note: data });
     })
});

// file ne edit karwa
app.get("/edit/:filename", (req, res) => {
     res.render('edit', {filename: req.params.filename})
})
app.post("/edit", (req, res) => {
     fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, (err) => {
          res.redirect("/");
     })
})

// file ne delete karwa
app.get("/delete/:filename", (req, res) => {
     res.render('delete', {filename: req.params.filename})
})
app.post("/delete", (req, res) => {
     fs.unlink(`./files/${req.body.previous}`, (err) => {
          res.redirect("/");
     })
})
app.listen(3000, () => {
     console.log("Server is running on port 3000");
});