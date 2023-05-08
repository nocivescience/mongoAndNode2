import app from './app.js';
import './database.js';
app.listen(app.get('port'), () => {
    console.log(`Server running at http://localhost:${app.get('port')}`);
    console.log('Environment:', process.env.NODE_ENV);
});