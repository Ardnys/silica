const { Client } = require("pg");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;
// TODO express server here

const client = new Client({
	user: "postgres",
	host: "localhost",
	database: "vet-db",
	password: "sharding7",
	port: "5432",
});

client.connect();

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/pets", (req, res) => {
	client.query("SELECT * FROM pet", (err, result) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(result.rows);
		}
	});
});

app.listen(PORT, () => {
	console.log(`server is running on port: ${PORT}`);
});

// // Create
// client.query('INSERT INTO yourtable (column1, column2) VALUES ($1, $2)', [value1, value2], (err, res) => {
//     if (err) throw err;
// });

// // Read
// client.query('SELECT * FROM yourtable WHERE column1 = $1', [value1], (err, res) => {
//     if (err) throw err;
//     console.log(res.rows);
// });

// // Update
// client.query('UPDATE yourtable SET column2 = $1 WHERE column1 = $2', [new_value, value1], (err, res) => {
//     if (err) throw err;
// });

// // Delete
// client.query('DELETE FROM yourtable WHERE column1 = $1', [value1], (err, res) => {
//     if (err) throw err;
// });

// client.end();
