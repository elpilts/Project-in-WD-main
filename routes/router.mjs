import express from 'express'
import session from 'express-session';

const homeController = await import(`../controllers/Home.mjs`)
const eventController = await import(`../controllers/Events.mjs`)

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