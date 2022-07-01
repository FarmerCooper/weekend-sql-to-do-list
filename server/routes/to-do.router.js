const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

//get songs from server
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "things_to_do" ORDER BY "due";';
    pool.query(queryText)
        .then((result) => {
            console.log('This is what we get from the server', result);
            // sends back the results in an object
            res.send(result.rows);
            console.log("This is what I'm sending", result.rows);
        })
        .catch((error) => {
            console.log('Error in GET query,', error);
            res.sendStatus(500);
        })
})

router.post('/', (req, res) => {
    const newTask = req.body;
    const queryText = `
        INSERT INTO "things_to_do" ("task", "due")
        VALUES ($1, $2);
    `;
    pool.query(queryText, [newTask.task, newTask.due])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error in POSTing - error =>', error)
            res.sendStatus(500);
        })
})

module.exports = router;