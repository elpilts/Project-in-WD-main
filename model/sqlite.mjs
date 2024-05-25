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
};

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


// Function to insert user data
//export const insertUserData = (name, email, phone, fieldOfStudies, password) => {
    // Open database connection
    //const db = openDatabaseConnection();
    
    //try {
        // Prepare and execute the insert query
        //const insertQuery = db.prepare('INSERT INTO Volunteer (Name, Email, Phone, Studies, Password) VALUES (?, ?, ?, ?, ?)');
        //const info1 = insertQuery.run(name, email, phone, fieldOfStudies, password);
       // console.log(info1);
        //return info.changes; // Number of rows affected (should be 1 for successful insert)
    //} catch (err) {
        //console.error("Error inserting user data:", err);
        //throw err;
   // } finally {
        // Close the database connection
       // db.close();
   // }
//};
