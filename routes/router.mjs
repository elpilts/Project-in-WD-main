import express from 'express';
import session from 'express-session';
import sqlite from 'better-sqlite3';
import bcrypt from 'bcrypt';
import { insertFormData, deleteUserDataByEmail, getUserByEmail } from '../model/sqlite.mjs';

const homeController = await import(`../controllers/Home.mjs`)
const eventController = await import(`../controllers/Events.mjs`)
const insertController = await import(`../controllers/Insert.mjs`)
const deleteController = await import(`../controllers/Delete.mjs`)
const editController = await import(`../controllers/Edit.mjs`)
const signupController = await import('../controllers/Signup.mjs')

const openDatabaseConnection = () => {
    const db = sqlite('db/Project_WebD_db.db');
    return db;
};

const router = express.Router()

// Use the express-session middleware
router.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
}));

// Use Express's built-in JSON middleware to parse JSON request bodies
router.use(express.json());

// Default route
router.get('/', (req, res) => {
    res.redirect('/home');
});

// Gets the parking site names in the home form
router.get('/home', async (req, res) => {
    try {
        const parkingSiteNames = await homeController.showParkingSiteName();
        console.log(parkingSiteNames);
        res.render('HomePage', {
            atHome: true,
            atAbout: false,
            atEvent: false,
            atContact: false,
            atAccount: false,
            atInsert: false,
            atEdit: false,
            atSign: false,
            parkingName: parkingSiteNames,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/events', async (req,res) => { //If admin:, if not: Events-no
    try{
        const events = await eventController.OurEvents();
        res.render('EventPage',{
            atHome: false,
            atAbout: false,
            atEvent: true,
            atContact: false,
            atAccount: false,
            atInsert: false,
            atEdit: false,
            ourevents: events
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/events/insert', async (req,res) => {
    try{
        res.render('NewEvent',{
            atHome: false,
            atAbout: false,
            atEvent: false,
            atContact: false,
            atAccount: false,
            atInsert: true,
            atEdit: false
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/events/edit', async (req, res) => {
    res.render('EditPage',{
        atHome: false,
        atAbout: false,
        atEvent: false,
        atContact: false,
        atAccount: false,
        atInsert: false,
        atEdit: true
    });
});

router.get('/events/delete', async (req, res) => {
        res.render('Delete',{
        atHome: false,
        atAbout: false,
        atEvent: false,
        atContact: false,
        atAccount: false,
        atInsert: false,
        atEdit: false,
        atDelete: true
    });
});

router.get('/about', async (req,res) => {
    try{
        res.render('AboutUsPage', {
            atHome: false,
            atAbout: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/signup', async (req,res) => {
    try{
        //const newDatas = await signupController.insertUserData();
        //console.log(newDatas);
        res.render('SignUp',{
            atHome: false,
            atAbout: false,
            atEvent: false,
            atContact: false,
            atSign: true
        });
    }catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    };
});

router.get('/events', async (req, res) => {
    try {
        res.render('ekdhloseis', {
            atHome: false,
            atAbout: false,
            atEvent: true,
            atContact: false,
            atSign: false,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/signup', (request, response) => {
    response.render('SignUp', {
        atHome: false,
        atAbout: false,
        atEvent: false,
        atContact: false,
        atSign: true,
    });
});

router.post('/signup', (request, response) => {
    // Parse form data
    const formData = {
        name: request.body.name,
        age: request.body.age,
        email: request.body.email,
        phone: request.body.phone,
        fieldOfStudies: request.body['field-of-studies'],
        password: request.body.password,
        repeatPassword: request.body['repeat-password'],
    };

    // Call function to insert data into the database
    insertFormData(formData)
        .then(() => {
            // Redirect to the success page and pass inserted data as query parameters
            response.redirect(`/account?name=${encodeURIComponent(formData.name)}&age=${encodeURIComponent(formData.age)}&email=${encodeURIComponent(formData.email)}&phone=${encodeURIComponent(formData.phone)}&fieldOfStudies=${encodeURIComponent(formData.fieldOfStudies)}`);
        })
        .catch(error => {
            console.error('Error inserting data:', error);
            response.status(500).send('An error occurred while inserting data.');
        });
});

router.get('/account', (request, response) => {
    // Retrieve inserted data from query parameters
    const userData = {
        name: request.query.name,
        age: request.query.age,
        email: request.query.email,
        phone: request.query.phone,
        fieldOfStudies: request.query.fieldOfStudies,
    };

    // Render the account view with user data
    response.render('account', { 
        user: userData,
        atAccount: true,

    });
});

router.delete('/delete-account', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    try {
        const result = deleteUserDataByEmail(email);
        if (result) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Failed to delete the account.' });
        }
    } catch (error) {
        console.error('Error deleting user data:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/account', async (req,res) => {
    try{
        const parkingSiteNames = await homeController.showParkingSiteName();
        res.render('account',{
            atHome: true,
            atAbout: false,
            atEvent: false,
            atContact: false,
            atSign: false,
            parkingName: parkingSiteNames
        });
    }catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    };
});

router.post('/login', async (req, res) => {
    const { 'login-email': email, 'login-password': password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    try {
        const user = await getUserByEmail(email);
        
        if (!user) {
            console.log('No user found with the provided email.');
            return res.redirect('/signup');
            
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        console.log('User found, checking password...');
        console.log(password);
        const hashedPassword = await bcrypt.hash(password, 10); // Wait for the hashing to complete
        console.log(hashedPassword);
        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        console.log(email);
        console.log("User:", user);
        if (passwordMatch) {
            console.log('Password matched. User logged in successfully.');
            return res.redirect(`/account?name=${user.Name}&age=${user.Age}&email=${user.Email}&phone=${user.Phone}&fieldOfStudies=${user.Studies}`);
            return res.status(200).json({ success: true, message: 'Logged in successfully.' });
        } else {
            console.log('Incorrect password.');
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

router.get('/events/edit', function(request, response, next){
    response.sendFile("EditPage");
});

router.post('/events/edit', function(request, response, next){
    // Parse form data
    const editData = {
        name: request.body.name,
        description: request.body.description,
        picture: request.body.picture
    };

    // Call function to insert data into the database
    editController.EditEvent(editData)
        .then(() => {
            response.redirect('/events')
        })
        .catch(error => {
            console.error('Error inserting data:', error);
            response.status(500).send('An error occurred while inserting data.');
        });
});

router.get('/events/insert', function(request, response, next){
    response.sendFile("NewEvent");
});

router.post('/events/insert', function(request, response, next){
    // Parse form data
    const eventData = {
        name: request.body.name,
        description: request.body.description,
        picture: request.body.picture
    };

    // Call function to insert data into the database
    insertController.InsertEvent(eventData)
        .then(() => {
            response.redirect('/events')
        })
        .catch(error => {
            console.error('Error inserting data:', error);
            response.status(500).send('An error occurred while inserting data.');
        });
});

router.get('/events/delete', function(request, response, next){
    response.sendFile("Delete");
});

router.post('/events/delete', function(request, response, next){
    // Parse form data
    const deleteData = {
        name: request.body.name
    };
    // Call function to insert data into the database
    deleteController.DeleteEvent(deleteData)
        .then(() => {
            response.redirect('/events')
        })
        .catch(error => {
            console.error('Error inserting data:', error);
            response.status(500).send('An error occurred while inserting data.');
        });
});

export default router;
