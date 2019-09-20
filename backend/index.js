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

app.get('/', (req, res) => {

    knex.from('session_blobs')
        .select('json_blob')
        .orderBy('id', 'desc')
        .first()
        .then(data => {
            res.setHeader('Content-Type', 'text/plain')
            res.write('you get:\n')
            res.end(JSON.stringify(data, null, 2))
        })

})

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