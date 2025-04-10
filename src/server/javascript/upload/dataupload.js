const path = require('path');
const sqlite3 = require('sqlite3');
const sql = `INSERT INTO dive(D_DIVER, D_DIVENUM, D_LATITUDE, D_LONGITUDE, D_POSACCURACY, D_ALTITUDE, D_ALTACCURACY, D_HEADING, D_SPEED) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`

async function uploadInfo(friendlyName, diveNum, latitude, longitude, posaccuracy, alititude, altaccuracy, heading, speed) {
    var db = new sqlite3.Database(path.resolve('skydiving.sqlite'));
    var response = await new Promise((resolve, reject) => {
        db.run(sql, [friendlyName, diveNum, latitude, longitude, posaccuracy, alititude, altaccuracy, heading, speed], (err) => {
            if(err){
                console.log(err);
            }

            resolve([200, null]);
        })       
    })

    return response;
}

module.exports = {uploadInfo}