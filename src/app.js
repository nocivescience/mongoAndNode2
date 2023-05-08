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
import indexRoutes from './routes/index.routes.js';
import notesRoutes from './routes/notes.routes.js';
import usersRoutes from './routes/users.routes.js';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'), 
    extname: '.hbs',
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
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});
// routes
app.use(indexRoutes);
app.use(notesRoutes);
app.use(usersRoutes);
// static files
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res) => {
    res.render('404');
})
export default app;