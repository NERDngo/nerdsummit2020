const { google } = require('googleapis');
const crypto = require('crypto');
const fs = require('fs');

exports.getData = () => {

    const sheets = google.sheets({ version: 'v4', auth: process.env.API_KEY });

    return new Promise((resolve, reject) => {

        sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEETS_ID,
            range: process.env.SHEETS_RANGE,
        }, (err, res) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(res.data.values);
            }
        })

    });

}

exports.checkHash = (data) => {

    const newHash = crypto.createHash('md5').update(JSON.stringify(data)).digest("hex");

    return new Promise((resolve, reject) => {
        fs.readFile('hash', 'utf8', function (err, contents) {
            if (err) reject(err);
            if (contents === newHash) {
                console.log("No update required.")
                resolve(false);
            }
            else {
                fs.writeFile('hash', newHash, (err) => {
                    if (err) return console.log("Error writing to the hash file.")
                })
                resolve(data);
            }
        });
    })

}