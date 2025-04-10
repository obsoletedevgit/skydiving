const path = require('path');
const sqlite3 = require('sqlite3');

async function downloadInfo(friendlyName, diveNum) {
    if (friendlyName != "*" && diveNum != "*"){
        var data = await nameAndNumSpecified(friendlyName, diveNum);
    } else if (friendlyName != "*"){
        var data = await nameSpecified(friendlyName);
    } else if (diveNum != "*"){
        var data = await numSpecified(diveNum);
    } else {
        var data = await noneSpecified();
    }
    return data;
}

async function nameAndNumSpecified(friendlyName, diveNum) {
    var db = new sqlite3.Database(path.resolve('skydiving.sqlite'));
    var sql = `SELECT * FROM dive WHERE D_DIVER = ? AND D_DIVENUM = ?`

    var response = await new Promise((resolve, reject) => {
        db.all(sql, [friendlyName, diveNum], (err, rows) => {
            if(err){
                console.log(err);
            }

            resolve([200, rows]);
        })       
    });

    return response;
}

async function nameSpecified(friendlyName) {
    var db = new sqlite3.Database(path.resolve('skydiving.sqlite'));
    sql = `SELECT * FROM dive WHERE D_DIVER = ?`

    var response = await new Promise((resolve, reject) => {
        db.all(sql, [friendlyName], (err, rows) => {
            if(err){
                console.log(err);
            }

            resolve([200, rows]);
        })       
    });

    return response;
}

async function numSpecified(diveNum) {
    var db = new sqlite3.Database(path.resolve('skydiving.sqlite'));
    sql = `SELECT * FROM dive WHERE D_DIVENUM = ?`

    var response = await new Promise((resolve, reject) => {
        db.all(sql, [diveNum], (err, rows) => {
            if(err){
                console.log(err);
            }

            resolve([200, rows]);
        })       
    });

    return response;
}

async function noneSpecified() {
    var db = new sqlite3.Database(path.resolve('skydiving.sqlite'));
    sql = `SELECT * FROM dive`

    var response = await new Promise((resolve, reject) => {
        db.all(sql, (err, rows) => {
            if(err){
                console.log(err);
            }

            resolve([200, rows]);
        })       
    });

    return response;
}


module.exports = {downloadInfo}