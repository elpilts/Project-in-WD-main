import express from 'express'
import session from 'express-session';
import sqlite from 'better-sqlite3';

const homeController = await import(`../controllers/Home.mjs`)
const eventController = await import(`../controllers/Events.mjs`)
const insertController = await import(`../controllers/Insert.mjs`)
const deleteController = await import(`../controllers/Delete.mjs`)
const editController = await import(`../controllers/Edit.mjs`)
const signupController = await import('../controllers/Signup.mjs')
// const con = await import('./connection');

const openDatabaseConnection = () => {
    const db = sqlite('db/Project_WebD_db.db');
    return db;
};

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
        res.render('HomePage',{
            atHome: true,
            atAbout: false,
            atEvent: false,
            atContact: false,
            atAccount: false,
            atInsert: false,
            atEdit: false,
            atSign: false,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/events', async (req,res) => {
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

router.get('/signup', async (req,res) => {
    try{
        //const newDatas = await signupController.insertUserData();
        //console.log(newDatas);
        res.render('SignUp',{
            atHome: false,
            atAbout: false,
            atEvent: false,
            atContact: false,
            atSign: true,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

export default router ;

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
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
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