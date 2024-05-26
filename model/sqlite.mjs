import sqlite from 'better-sqlite3';

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
export const insertFormData = (formData) => {
    const db = openDatabaseConnection();

    try {
        const query = db.prepare('INSERT INTO Volunteer (Name, Email, Phone, Age, Password, Studies) VALUES (?, ?, ?, ?, ?, ?)');
        query.run(formData.name, formData.surname, formData.email, formData.phone, formData.password, formData.fieldOfStudies);
        return Promise.resolve(formData); // Resolve with the inserted data
    } catch (error) {
        console.error('Error inserting form data:', error);
        return Promise.reject(error);
    } finally {
        // Close database connection or do any necessary cleanup
    }
};

//function to read account data
export function getUserDataByEmail(email) {
    return new Promise((resolve, reject) => {
        const db = openDatabaseConnection();
        const query = db.prepare('SELECT * FROM Volunteer WHERE email = ?');
        try {
            const info = query.all(email); 
            console.log(info);
            resolve(info);
        } catch (err) {
            console.error("Error fetching user data:", err);
            reject(err);
        } finally {
            db.close();
        }
    });
}
