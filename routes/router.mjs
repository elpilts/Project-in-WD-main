import express from 'express'
import session from 'express-session';

const homeController = await import(`../controllers/Home.mjs`)
const eventController = await import(`../controllers/Events.mjs`)
const insertController = await import(`../controllers/Insert.mjs`)
const deleteController = await import(`../controllers/Delete.mjs`)
const editController = await import(`../controllers/Edit.mjs`)

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
            atInsert: false,
            atEdit: false,
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

router.post('/insert-event', async (req, res) => {
    // console.log('Request body:', req.body);
    // const { name, description, picture } = req.body;
    try {
        await insertController.InsertEvent(req,res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/insert-event', async (req,res) => {
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

router.delete('/events/:eventName', async (req, res) => {
    const eventName = req.params.eventName;
    console.log("name:", eventName);
    try {
        await deleteController.DeleteEvent( eventName );
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).send('Internal Server Error');
    }
});
// router.post('/events', async (req,res) => {
//     const { thedelevent } = req.body;
//     try{
//         console.log("deleted elem:", thedelevent);
//         const noevent = await deleteController.DeleteEvent(thedelevent);
//     }
//     catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

router.put('/events/edit/:eventName', async (req, res) => {
    const eventName = req.params.eventName;
    const eventDescription = req.params.eventDescription;
    const eventPicture = req.params.eventPicture;
    try {
        console.log("name:", eventName);
        await editController.EditEvent(eventName, eventDescription, eventPicture);
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/events/edit', async (req,res) => {
    try{
        res.render('EditPage',{
            atHome: false,
            atAbout: false,
            atEvent: false,
            atContact: false,
            atAccount: false,
            atInsert: false,
            atEdit: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// router.get('/events/edit', async (req, res) => {
//     res.render('EditPage',{
//         atHome: false,
//         atAbout: false,
//         atEvent: false,
//         atContact: false,
//         atAccount: false,
//         atInsert: false,
//         atEdit: true
//     });
// });

// router.post('/events/edit', async (req, res) => {
//     try {
//         await editController.EditEvent(req,res);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

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