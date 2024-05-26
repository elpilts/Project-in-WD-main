import express from 'express';
import { engine } from 'express-handlebars';
import router from './routes/router.mjs';
import session from 'express-session';
import { insertFormData } from './model/sqlite.mjs';
import { edit } from './model/sqlite.mjs';
import { Insert } from './model/sqlite.mjs';

const app = express();
const PORT = process.env.PORT || '3001';

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.engine('hbs', engine({ extname: 'hbs', defaultLayout: 'main', layoutsDir: 'views/layouts/' }));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use('/',router);

app.get('/form/submit', function(request, response, next){

	response.send(`
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<div class="container">
			<h1 class="text-center mt-3 mb-3">Submit Form Data in Node.js</h1>
			<div class="card">
				<div class="card-header">Sample Form</div>
				<div class="card-body">
					<form method="POST" action="/form/submit">
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

app.post('/form/submit', function(request, response, next){
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
        .then(() => {
            response.send('Data inserted successfully!');
        })
        .catch(error => {
            console.error('Error inserting data:', error);
            response.status(500).send('An error occurred while inserting data.');
        });
});

app.get('/events/edit', function(request, response, next){

	response.send(`
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <main>
            <div class="edit">
                <h1> Edit the Event</h1>
                <form id="editForm" action="/events/edit" method="POST">
                    <div class="name">
                        <label for="name"> Name of the Event you want to change <br> </label>
                        <input type="text" id="name" name="name" placeholder="Event Name">
                    </div>
                    <div class="description">
                        <label for="description"> Description of the Event <br> </label>
                        <input type="text" id="description" name="description" placeholder="Description">
                    </div>
                    <div class="picture">
                        <label for="picture"> Picture of the Event <br> </label>
                        <input type="text" id="picture" name="picture" placeholder="Picture Link">
                    </div>
                    <div class="edit-btn">
		                <input type="submit" value="Done" />
		            </div>
                </form>
            </div>
        </main>
	`);


});

app.post('/events/edit', function(request, response, next){
    // Parse form data
    const editData = {
        name: request.body.name,
        description: request.body.description,
        picture: request.body.picture
    };

    // Call function to insert data into the database
    edit(editData)
        .then(() => {
            response.send('Data inserted successfully!');
        })
        .catch(error => {
            console.error('Error inserting data:', error);
            response.status(500).send('An error occurred while inserting data.');
        });
});

app.get('/events/insert', function(request, response, next){

	response.send(`
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <main>
    <div class="create">
        <h1> Create New Event</h1>
        <form id="createForm" action="/events/insert" method="POST">
            <div class="c-name">
                <label for="name"> Name of the Event <br> </label>
                <input type="text" id="name" name="name" placeholder="Event Name" required>
            </div>
            <div class="c-description">
                <label for="description"> Description of the Event <br> </label>
                <input type="text" id="description" name="description" placeholder="Description" required>
            </div>
            <div class="c-picture">
                <label for="picture"> Picture of the Event <br> </label>
                <input type="text" id="picture" name="picture" placeholder="Picture Link" required>
            </div>
            <div class="create-btn">
                <input type="submit" value="Create" />
            </div>
        </form>
    </div>
</main>
	`);
});

app.post('/events/insert', function(request, response, next){
    // Parse form data
    const eventData = {
        name: request.body.name,
        description: request.body.description,
        picture: request.body.picture
    };

    // Call function to insert data into the database
    Insert(eventData)
        .then(() => {
            response.send('Data inserted successfully!');
        })
        .catch(error => {
            console.error('Error inserting data:', error);
            response.status(500).send('An error occurred while inserting data.');
        });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = app.listen(PORT, () => {
    console.log(`http://127.0.0.1:${PORT}`);
});