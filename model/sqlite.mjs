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

export let Insert = (eventName,eventDescription,eventPicture) => {
    const query = db.prepare('INSERT INTO Event (Name, Description, Picture) VALUES (?, ?, ?)'); //οριζει query
    let info;
    try { //trexei query & το επιστρέφει
        info = query.run(eventName,eventDescription,eventPicture);
        return true;
    }
    catch (err) {
        throw err;
    }
}

export let Delete = (deletename) => {
    const query = db.prepare('DELETE FROM Event WHERE Name = ?'); //οριζει query
    let info;
    try { //trexei query & το επιστρέφει
        info = query.run(deletename);
        return info;
    }
    catch (err) {
        throw err;
    }
}

export let Edit = (eventName, eventDescription, eventPicture) => {
    const query = db.prepare('UPDATE Event SET Description = ?, Picture = ? WHERE Name = ?'); //οριζει query
    let info;
    try { //trexei query & το επιστρέφει
        info = query.run(eventDescription, eventPicture, eventName);
        return true;
    }
    catch (err) {
        throw err;
    }
}