const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const { render } = require("ejs");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "view");
const db = mysql.createConnection({
  host: "localhost",
  database: "learnCrud",
  user: "ryn",
  password: "Skuyb4ng",
});

db.connect((err) => {
  if (err) throw err;

  app.get("/", (req, res) => {
    const sql = "select * from mahasiswa";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.render("index", { title: "Daftar Mahasiwa", user: result });
    });
  });
  app.get("/adduser", (req, res) => {
    res.render("add");
  });
  app.post("/add", (req, res) => {
    const sql = `insert into mahasiswa(nama,mobile,class) values('${req.body.nama}','${req.body.mobile}','${req.body.class}')`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  });
  app.get("/delete", (req, res) => {
    const sql = `delete from mahasiswa where id=${req.query.id}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  });
  app.get("/edit", (req, res) => {
    res.redirect("/");
    const sql = `select * from mahasiswa where id=${req.query.id}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.render("edit", { user: result });
    });
  });
  app.post("/update", (req, res) => {
    const sql = `update mahasiswa set nama ='${req.body.nama}', mobile='${req.body.mobile}',class='${req.body.class}' where id= ${req.body.id}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  });
});

app.listen(3000);
