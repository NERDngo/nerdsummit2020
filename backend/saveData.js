// const fs = require("fs")
const knex = require('./knex/knex.js');

exports.saveData = (data) => {

    return new Promise((resolve, reject) => {
        knex('session_blobs')
            .insert({ json_blob: JSON.stringify(data) })
            // .then(data => { console.log("what knex say: ", data); return data; })
            .then(resolve)
            .catch(reject)
    });


}

exports.processSheets = (data) => {

    return new Promise((resolve, reject) => {
        const keys = data[0];

        const dataArray = data.slice(1);

        resolve(dataArray.map(rowArray => {

            return keys.reduce((acc, curr, index) => {
                acc[curr] = rowArray[index];
                return acc;
            }, {});

        }))
    });


}