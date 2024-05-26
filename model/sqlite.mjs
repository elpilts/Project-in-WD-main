import sqlite from 'better-sqlite3';
import bcrypt from 'bcrypt';

// Create a function to open the database connection
const openDatabaseConnection = () => {
    const db = sqlite('db/Project_WebD_db.db');
    return db;
};

// Function to get parking site name
export const getParkingSiteName = () => {
    const db = openDatabaseConnection();
    
    try {
        const query = db.prepare('SELECT Email FROM Volunteer WHERE Phone = ?');
        const info = query.all(6955441017); // Pass phone number as parameter
        return info;
    } catch (err) {
        console.error("Error fetching parking site name:", err);
        throw err;
    } finally {
        db.close();
    }
}

export let Events = () => {
    const db = openDatabaseConnection();
    const query = db.prepare('SELECT * from Event'); //οριζει query
    let info;
    try { //trexei query & το επιστρέφει
        info = query.all();
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
    const db = openDatabaseConnection();
    const query = db.prepare('DELETE FROM Event WHERE Name = ?'); //οριζει query
    let info;
    try { //trexei query & το επιστρέφει
        info = query.run(deletename.name);
        return true;
    }
    catch (err) {
        throw err;
    } finally{
        db.close();
    }
}

// Function to insert form data into the database
export const insertFormData = async (formData) => {
    const db = openDatabaseConnection();

    try {
        const hashedPassword = await bcrypt.hash(formData.password, 10); // Hash the password
        const query = db.prepare('INSERT INTO Volunteer (Name, Email, Phone, Age, Password, Studies) VALUES (?, ?, ?, ?, ?, ?)');
        query.run(formData.name, formData.email, formData.phone, formData.age, hashedPassword, formData.fieldOfStudies);
        return Promise.resolve(formData); // Resolve with the inserted data
    } catch (error) {
        console.error('Error inserting form data:', error);
        return Promise.reject(error);
    } finally {
        db.close(); // Close database connection
    }
};

export const deleteUserDataByEmail = (email) => {
    const db = openDatabaseConnection();
    const query = db.prepare('DELETE FROM Volunteer WHERE Email = ?');
    try {
        query.run(email);
        console.log("deleted from database");
        return true;
    } catch (error) {
        console.error('Error deleting user data:', error);
        throw error;
    } finally {
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
    }
};

export const getUserByEmail = (email) => {
    const db = openDatabaseConnection();
    
    try {
        const query = db.prepare('SELECT * FROM Volunteer WHERE Email = ?');
        const user = query.get(email);
        return user;
    } catch (err) {
        console.error("Error fetching user by email:", err);
        throw err;
    } finally {
        db.close();
    }
};