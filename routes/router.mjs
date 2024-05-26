import express from 'express';
import session from 'express-session';
import { insertFormData, deleteUserDataByEmail } from '../model/sqlite.mjs';

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
    response.send(`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <div class="container">
            <h1 class="text-center mt-3 mb-3">Submit Form Data in Node.js</h1>
            <div class="card">
                <div class="card-header">Sample Form</div>
                <div class="card-body">
                    <form method="POST" action="/signup">
                        <div class="info">
                            <div class="full-name">
                                <div class="name">
                                    <h3>Name & Surname *</h3>
                                    <input type="text" id="name" name="name" placeholder="Type your Name" required>
                                </div>
                                <div class="age">
                                    <h3>Age *</h3>
                                    <input type="text" id="age" name="age" placeholder="Type your Age" required>
                                </div>
                            </div>
                            <div class="contact">
                                <div class="email">
                                    <h3>Email *</h3>
                                    <input type="email" id="email" name="email" placeholder="Type your Email" required>
                                </div>
                                <div class="phone">
                                    <h3>Phone Number *</h3>
                                    <input type="tel" id="phone" name="phone" placeholder="Type your Phone Number" maxlength="10" required>
                                </div>
                            </div>
                            <div class="uni">
                                <h3>Field of Studies in University of Patras *</h3>
                                <input type="text" id="field-of-studies" name="field-of-studies" placeholder="Type your Field of Studies" required>
                            </div>
                            <div class="crt-password">
                                <div class="password">
                                    <h3>Password *</h3>
                                    <input type="password" id="password" name="password" placeholder="Create a Password" required>
                                    <button type="button" class="toggle-password">Show</button>
                                </div>
                                <div class="rpt-password">
                                    <h3>Repeat Password *</h3>
                                    <input type="password" id="repeat-password" name="repeat-password" placeholder="Repeat your Password" required>
                                    <button type="button" class="toggle-password">Show</button>
                                </div>
                                <div class="mb-3">
                                    <input type="submit" name="submit_button" class="btn btn-primary" value="Add">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `);
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
    response.render('account', { user: userData });
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

router.get('/login', async (req, res) => {
    try {
        res.render('LogIn', {
            atHome: true,
            atAbout: false,
            atEvent: false,
            atContact: false,
            atSign: false,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


export default router;
