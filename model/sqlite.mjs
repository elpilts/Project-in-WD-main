import sqlite from 'better-sqlite3';
import bcrypt from 'bcrypt';

// Create a function to open the database connection
const openDatabaseConnection = () => {
    const db = sqlite('db/Project_WebD_db.db', { verbose: console.log });
    return db;
};

// Function to get parking site name
export const getParkingSiteName = () => {
    const db = openDatabaseConnection();
    
    try {
        const query = db.prepare('SELECT Email FROM Volunteer WHERE Phone = ?');
        const info = query.all(6955441017); // Pass phone number as parameter
        console.log(info);
        return info;
    } catch (err) {
        console.error("Error fetching parking site name:", err);
        throw err;
    } finally {
        db.close();
    }
};

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