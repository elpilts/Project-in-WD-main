import sqlite from 'better-sqlite3';

const db=new sqlite('db/Project_WebD_db.db');

export let getParkingSiteName = () => {
    const query = db.prepare('SELECT Email from Εθελοντής WHERE Κινητό=6955441017'); //οριζει query
    let info;
    try { //trexei query & το επιστρέφει
        info = query.all();
        return info;
    }
    catch (err) {
        throw err;
    }
}