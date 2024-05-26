import express from 'express'
import session from 'express-session';
import { insertFormData, getUserDataByEmail } from '../model/sqlite.mjs';

const homeController = await import(`../controllers/Home.mjs`)
const signupController = await import('../controllers/Signup.mjs')
const accountController = await import('../controllers/Acount.mjs')

const router = express.Router()

// Use the express-session middleware
router.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true
  }));


//Default
router.get('/', (req, res) => {
    res.redirect('/home')
});


//Gets the parking site names in the home form
router.get('/home', async (req,res) => {
    try{
        const parkingSiteNames = await homeController.showParkingSiteName();
        console.log(parkingSiteNames);
        res.render('HomePage',{
            atHome: true,
            atAbout: false,
            atEvent: false,
            atContact: false,
            atSign: false,
            parkingName: parkingSiteNames
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/about', async (req,res) => {
    try{
        //const parkingSiteNames = await homeController.showParkingSiteName(); αν χρειαστει κατι απο την database
        res.render('AboutUsPage',{
            atHome:false,
            atAbout:true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/events', async (req,res) => {
    try{
        //const parkingSiteNames = await homeController.showParkingSiteName(); αν χρειαστει κατι απο την database
        res.render('ekdhloseis',{
            atHome: false,
            atAbout: false,
            atEvent: false,
            atContact: true,
            atSign: false,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/signup', function(request, response, next){

	response.send(`
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<div class="container">
			<h1 class="text-center mt-3 mb-3">Submit Form Data in Node.js</h1>
			<div class="card">
				<div class="card-header">Sample Form</div>
				<div class="card-body">
					<form method="POST" action="/signup">
                    <div class="info">
                    <div class="full-name">
                        <div class="name">
                            <h3>Name *</h3>
                            <input type="text" id="name" name="name" placeholder="Type your Name" required>
                        </div>
                        <div class="surname">
                            <h3>Surname *</h3>
                            <input type="text" id="surname" name="surname" placeholder="Type your Surname" required>
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
		                	<input type="submit" name="submit_button" class="btn btn-primary" value="Add" />
		                </div>
					</form>
				</div>
			</div>
		</div>
	`);


});

router.post('/signup', function(request, response, next){
    // Parse form data
    const formData = {
        name: request.body.name,
        surname: request.body.surname,
        email: request.body.email,
        phone: request.body.phone,
        fieldOfStudies: request.body['field-of-studies'],
        password: request.body.password,
        repeatPassword: request.body['repeat-password']
    };

    // Call function to insert data into the database
    insertFormData(formData)
        .then((insertedData) => {
            // Format inserted data for display
            const formattedData = `
                <h2>Data inserted successfully!</h2>
                <p><strong>Name:</strong> ${insertedData.name} ${insertedData.surname}</p>
                <p><strong>Email:</strong> ${insertedData.email}</p>
                <p><strong>Phone:</strong> ${insertedData.phone}</p>
                <p><strong>Field of Studies:</strong> ${insertedData.fieldOfStudies}</p>
            `;
            response.send(formattedData); // Send formatted data back to the client
        })
        .catch(error => {
            console.error('Error inserting data:', error);
            response.status(500).send('An error occurred while inserting data.');
        });
});


router.get('/account', async (req,res) => {
    try{
        const parkingSiteNames = await accountController.showParkingSiteName();
        console.log(parkingSiteNames);
        res.render('account',{
            atHome: true,
            atAbout: false,
            atEvent: false,
            atContact: false,
            atSign: false,
            parkingName: parkingSiteNames
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


export default router ;