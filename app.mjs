import express from 'express';
import { engine } from 'express-handlebars';
import router from './routes/router.mjs';
import session from 'express-session';
import { insertFormData } from './model/sqlite.mjs';

const app = express();
const PORT = process.env.PORT || '3001';

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.engine('hbs', engine({ extname: 'hbs', defaultLayout: 'main', layoutsDir: 'views/layouts/' }));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use('/',router);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = app.listen(PORT, () => {
    console.log(`http://127.0.0.1:${PORT}`);
});