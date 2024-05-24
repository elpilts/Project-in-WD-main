import sqlite from 'better-sqlite3';

const db=new sqlite('db/Project_WebD_db.db');

export let getParkingSiteName = () => {
    const query = db.prepare('SELECT Email from Volunteer WHERE Phone=6955441017'); //οριζει query
    let info;
    try { //trexei query & το επιστρέφει
        info = query.all();
        return info;
    }
    catch (err) {
        throw err;
    }
}

export let Events = () => {
    const query = db.prepare('SELECT * from Event'); //οριζει query
    let info;
    try { //trexei query & το επιστρέφει
        info = query.all();
        return info;
    }
    catch (err) {
        throw err;
    }
}