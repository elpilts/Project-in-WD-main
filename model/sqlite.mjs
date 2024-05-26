import sqlite from 'better-sqlite3';

// Create a function to open the database connection
const openDatabaseConnection = () => {
    const db = sqlite('db/Project_WebD_db.db', { verbose: console.log });
    return db;
};

// Function to get parking site name
export const getParkingSiteName = () => {
    // Open database connection
    const db = openDatabaseConnection();
    
    try {
        // Prepare and execute the query
        const query = db.prepare('SELECT Email FROM Volunteer WHERE Phone = ?');
        const info = query.all(6955441017); // Pass phone number as parameter
        console.log(info);
        return info;
    } catch (err) {
        console.error("Error fetching parking site name:", err);
        throw err;
    } finally {
        // Close the database connection
        db.close();
    }
}

export let Events = () => {
    const db = openDatabaseConnection();
    const query = db.prepare('SELECT * from Event'); //οριζει query
    let info;
    try { //trexei query & το επιστρέφει
        info = query.all();
        console.log(info);
        return info;
    }
    catch (err) {
        throw err;
    } finally {
        // Close the database connection
        db.close();
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

// Function to insert form data into the database
export const insertFormData = (formData) => {
    // Open database connection
    const db = openDatabaseConnection();

    try {
        // Prepare and execute the insert query
        const query = db.prepare('INSERT INTO Volunteer (Name, Email, Phone, Age, Password, Studies) VALUES (?, ?, ?, ?, ?, ?)');
        query.run(formData.name, formData.surname, formData.email, formData.phone, formData.fieldOfStudies, formData.password);

        // Return a promise to handle asynchronous operations
        return Promise.resolve();
    } catch (error) {
        console.error('Error inserting form data:', error);
        return Promise.reject(error);
    } finally {
        // Close the database connection
        db.close();
    }
};

export const Edit = (editData) => {
    // Open database connection
    const db = openDatabaseConnection();

    try {
        // Prepare and execute the insert query
        const query = db.prepare('UPDATE Event SET Description = ?, Picture = ? WHERE Name = ?');
        query.run(editData.description, editData.picture, editData.name);

        // Return a promise to handle asynchronous operations
        return Promise.resolve();
    } catch (error) {
        console.error('Error inserting form data:', error);
        return Promise.reject(error);
    } finally {
        // Close the database connection
        db.close();
    }
};

export const Insert = (eventData) => {
    // Open database connection
    const db = openDatabaseConnection();

    try {
        // Prepare and execute the insert query
        const query = db.prepare('INSERT INTO Event (Name, Description, Picture) VALUES (?, ?, ?)');
        query.run(eventData.name, eventData.description, eventData.picture);

        // Return a promise to handle asynchronous operations
        return Promise.resolve();
    } catch (error) {
        console.error('Error inserting form data:', error);
        return Promise.reject(error);
    } finally {
        // Close the database connection
        db.close();
    }
};