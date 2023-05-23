const express = require('express');
const mysql = require('mysql2');
const PORT = 3001;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//CONNECT TO THE LOCAL DATABASE
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'library_db'
    },
    console.log(`Connected to the database`)
)

app.get('/', (req, res) => {
    db.query('SELECT * FROM libraries', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.json(results);
    });
})
// C R U D
app.get('/', (req, res) => { //PREPARED STATEMENTS
    db.query('SELECT * FROM libraries WHERE name = ?', req.query.city, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.json(results);
    });
});

app.post('/', (req, res) => {
    db.query(`INSERT INTO libraries (name, address) VALUES (?, ?);`, [req.body.name, req.body.address], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.json({message: 'success', results});
    })
});

//UPDATE
app.put('/', (req, res) => {
    db.query('UPDATE libraries SET name = ?, address = ? WHERE id = ?;', [req.body.name, req.body.address, req.query.id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.json({message: 'success', results})
    })
})

//DELETE
app.delete('/', (req, res) => {
    db.query('DELETE from libraries WHERE id = ?;', req.query.id, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.json({message: 'success', results})
    })
})

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT: ${PORT}`);
})