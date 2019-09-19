const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
const knex = require('./knex/knex.js');

app.set("port", process.env.PORT || port);

app.disable('x-powered-by');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {

    knex.from('session_blobs')
        .select('json_blob')
        .orderBy('id', 'desc')
        .first()
        .then(data => {
            console.log(data);
            res.setHeader('Content-Type', 'text/plain')
            res.write('you get:\n')
            res.end(JSON.stringify(data, null, 2))
        })

})

app.post('/', (req, res) => {

    const secret = req.header("X-Secret");

    if (!secret || secret !== rocess.env.SECRET) {
        return res.send("406");
    }

    knex('session_blobs').insert({ json_blob: req.body }).then(data => {
        res.setHeader('Content-Type', 'text/plain')
        res.write('you saved:\n')
        return res.end(JSON.stringify(data, null, 2))
    });


});

app.listen(app.get("port"), () => console.log(`Example app listening on port ${port}!`))