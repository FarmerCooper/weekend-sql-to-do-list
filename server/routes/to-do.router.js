const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

//get songs from server
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "things_to_do" ORDER BY "due";';
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error in GET query,', error);
            res.sendStatus(500);
        })
})

module.exports = router;