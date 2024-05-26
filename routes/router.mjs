import express from 'express';
import session from 'express-session';
import bcrypt from 'bcrypt';
import { insertFormData, deleteUserDataByEmail, getUserByEmail } from '../model/sqlite.mjs';

const homeController = await import(`../controllers/Home.mjs`);
const signupController = await import('../controllers/Signup.mjs');

const router = express.Router();

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
            atSign: false,
            parkingName: parkingSiteNames,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/about', async (req, res) => {
    try {
        res.render('AboutUsPage', {
            atHome: false,
            atAbout: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
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


export default router;
