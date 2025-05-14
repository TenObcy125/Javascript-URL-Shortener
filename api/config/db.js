const sqlite3 = require('sqlite3');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'database', 'database.sqlite');
const SCHEMA_PATH = path.join(__dirname, '..', 'database', 'schema.sql');

function initializeDatabase() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(DB_PATH, (err) => {
            if (err) {
                console.error('Could not connect to database', err);
                reject(err);
                return;
            }
            console.log('Connected to SQLite database.');

            fs.readFile(SCHEMA_PATH, 'utf8', (err, schema) => {
                if (err) {
                    console.error('Could not read schema.sql file', err);
                    reject(err);
                    return;
                }

                db.exec(schema, (err) => {
                    if (err) {
                        console.error('Error runing schema SQL', err);
                        reject(err);
                        return;
                    }
                    console.log('Database schema created or verified.');
                    resolve(db);
                });
            });
        });
    });
}

module.exports = {
    initializeDatabase,
};