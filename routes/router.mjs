import express from 'express'
import session from 'express-session';

const homeController = await import(`../controllers/Home.mjs`)
const eventController = await import(`../controllers/Events.mjs`)
const insertController = await import(`../controllers/Insert.mjs`)
const deleteController = await import(`../controllers/Delete.mjs`)

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
            atAccount: false,
            parkingName: parkingSiteNames
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
        console.log(events);
        res.render('EventPage',{
            atHome: false,
            atAbout: false,
            atEvent: true,
            atContact: false,
            atAccount: false,
            ourevents: events
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/insert-event', async (req, res) => {
    const { name, description, picture } = req.body;

    try {
        console.log("new:", name, description, picture);
        newevent = await model.InsertEvent(name, description, picture); // Assuming createEvent is a function in your model to insert new events
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/insert-event', async (req,res) => {
    try{
        const newevent = await insertController.InsertEvent();
        console.log(newevent);
        res.render('NewEvent',{
            atHome: false,
            atAbout: false,
            atEvent: false,
            atContact: false,
            atAccount: false,
            atInsert: true,
            ourevents: newevent
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/events', async (req,res) => {
    const { thedelevent } = req.body;
    try{
        console.log("deleted elem:", thedelevent);
        const noevent = await deleteController.DeleteEvent(thedelevent);
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

export default router ;