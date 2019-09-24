const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
const knex = require('./knex/knex.js');
const { getData } = require("./sheetsHelpers.js");
const { saveData, processSheets } = require("./saveData.js");

app.set("port", process.env.PORT || port);

app.disable('x-powered-by');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// Unsorted session objects
app.get('/', (req, res) => {

    knex.from('session_blobs')
        .select('json_blob')
        .orderBy('id', 'desc')
        .first()
        .then(data => {

            const responseData = {
                data: {
                    Sessions: data.json_blob
                }
            }
            res.setHeader('Content-Type', 'text/plain')
            res.end(JSON.stringify(responseData, null, 2))
        })

})

// Session objects sorted by day
app.get('/by-day', (req, res) => {

    knex.from('session_blobs')
        .select('json_blob')
        .orderBy('id', 'desc')
        .first()
        .then(data => {
            console.log(data)
            const days = data.json_blob.reduce((acc, curr) => {
                if (curr.data = "Saturday") {
                    acc.Saturday.push(curr);
                    return acc;
                }
                acc.Sunday.push(curr);
                return acc;
            }, {
                Saturday: [],
                Sunday: []
            })
            const responseData = {
                data: {
                    Sessions: days
                }
            }
            res.setHeader('Content-Type', 'text/plain')
            res.end(JSON.stringify(responseData, null, 2))
        })

})

// Initiate a Sheets fetch
app.get('/initiate-fetch', (req, res) => {

    getData()
        .then(processSheets)
        .then(saveData)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            console.log(err)
            res.send("Error at the end: ", err);
        })

});

app.listen(app.get("port"), () => console.log(`NerdSummit app listening on port ${port}!`))