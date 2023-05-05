import express from 'express';
import {engine} from 'express-handlebars';
import { dirname } from 'path';
import path from 'path';
import morgan from 'morgan';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import methodOverride from 'method-override';
import MongoStore from 'connect-mongo';
import { fileURLToPath } from 'url';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'), extname: '.hbs',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: 'mongodb://localhost/notes-app'})
}));
export default app;