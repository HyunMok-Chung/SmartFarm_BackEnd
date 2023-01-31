const express = require("express");
const mysql = require("mysql");
const db = require("../../db/index");

const app = express();
app.use(express.json());
app.set('port', 3000);
app.get("/messages", (req, res) => {
	db.connection.query(`SELECT * FROM hello`, (err, results) => {
		if (err)
			console.log(err);
		res.send(results);
		console.log(results);
	});
});

app.get("/userDB", (req, res) => {
	var body = req.body;
	console.log(body);
	var params = [body.id, body.name, body.pw, body.email, body.right];
	var sql = 'INSERT INTO user VALUES (?, ?, ?, ?, ?)';
	db.connection.query(sql, params, (err, results) => {
		if (err)
			console.log(err);
		res.send(results);
		console.log(results);
	});
});

app.listen(app.get("port"));
console.log("Listening on", app.get("port"));
