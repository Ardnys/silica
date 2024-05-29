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
  password: process.env.POSTGRE_PASSWORD,
  port: "5432",
});

client.connect();

app.use(express.static(path.join(__dirname, "public")));

// Add fields as necessary
app.get("/api/pets", (req, res) => {
  client.query(
    `SELECT o.name as owner_name, p.name as pet_name, p.microchip_number 
			      FROM pet as p, owner as o 
				  WHERE p.owner_id = o.owner_id`,
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(result.rows);
      }
    }
  );
});

app.get("/api/owners", (req, res) => {
  client.query("SELECT * FROM owner", (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result.rows);
    }
  });
});

app.get("/api/owner_totals", (req, res) => {
  client.query(
    `
  SELECT o.name AS name, SUM(v2.price) AS total_price
  FROM owner o
  JOIN pet p ON o.owner_id = p.owner_id
  JOIN vaccination v1 ON v1.pet_id = p.pet_id
  JOIN vaccine v2 ON v1.vaccine_id = v2.vaccine_id
  GROUP BY o.owner_id
  ORDER BY total_price DESC;
`,
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(result.rows);
      }
    }
  );
});

app.get("/api/pet_owner", (req, res) => {
  const pet_id = req.query.pet_id;
  let query_string = `select o.name as owner_name
			from public.pet as p, public.owner as o
			where p.owner_id = o.owner_id `;
  if (pet_id) {
    query_string += `and p.pet_id = $1;`;
  }
  client.query(query_string, [pet_id], (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log("what: " + err);
    } else {
      res.json(result.rows);
    }
  });
});

app.get("/api/owner_pet", (req, res) => {
  const owner_name = req.query.owner_name;
  console.log("owner name: " + owner_name);
  let query_string = `select o.name as owner_name, p.name as pet_name
					from owner as o, pet as p 
					where p.owner_id = o.owner_id `;
  if (owner_name) {
    query_string += `and o.name = $1;`;
  }
  console.log("query str: " + query_string);
  client.query(query_string, [owner_name], (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log("what: " + err);
    } else {
      res.json(result.rows);
      console.log("yes");
    }
  });
});

app.get("/api/incoming_vaccines", (req, res) => {
  let query_string = `
		SELECT vin.vaccination_date, vac.name AS vaccine_name, pet.name AS pet_name, o.name as owner_name,
		(vin.vaccination_date + interval '1 month' * (vac.time_period))::date AS next_vaccination
		FROM public.vaccination AS vin, public.vaccine AS vac, public.pet AS pet, public.owner as o
		WHERE vin.vaccine_id = vac.vaccine_id AND
		vin.owner_id = o.owner_id AND
		vin.pet_id = pet.pet_id AND
		(vin.vaccination_date + interval '1 month' * (vac.time_period-1)) < CURRENT_DATE 	
	`;
  console.log("query str: " + query_string);
  client.query(query_string, (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log("err: ", err);
    } else {
      res.json(result.rows);
    }
  });
});

app.listen(PORT, () => {
  console.log(`server is running on: http://localhost:${PORT}`);
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
