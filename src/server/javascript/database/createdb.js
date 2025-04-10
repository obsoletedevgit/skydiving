const sqlite3 = require('sqlite3');
const path = require('path');

const databaseName = 'skydiving.sqlite';

async function createDB() {
    console.log('Regenerating db...');

    await createDiveTable();
}

async function createDiveTable() {
    console.log('Generating lobby table..');

    const db = new sqlite3.Database(path.resolve(databaseName));

    var lobbysql = "CREATE TABLE `dive` (`D_ID` INTEGER PRIMARY KEY AUTOINCREMENT,`D_DIVER` TEXT DEFAULT 'NO DATA',`D_DIVENUM` TEXT DEFAULT 'NO DATA',`D_LATITUDE` TEXT DEFAULT 'NO DATA',`D_LONGITUDE` TEXT DEFAULT 'NO DATA',`D_POSACCURACY` TEXT DEFAULT 'NO DATA',`D_ALTITUDE` TEXT DEFAULT 'NO DATA',`D_ALTACCURACY` TEXT DEFAULT 'NO DATA',`D_HEADING` TEXT DEFAULT 'NO DATA',`D_SPEED` TEXT DEFAULT 'NO DATA',`D_TIMESTAMP` TEXT DEFAULT CURRENT_TIMESTAMP)"

    var response = new Promise((resolve, reject) => {
        db.run(lobbysql, (err) => {
            if (err){
                console.log(err);
                process.exit(1);
            }

            console.log('Generated dive table..');
            resolve(0);
        })
    });

    db.close();
    return;
}

createDB();