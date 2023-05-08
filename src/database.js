import mongoose from 'mongoose';
import config from './config.js';
(async () => {
    try {
        const db= await mongoose.connect(
            config.MONGODB_URI,
            {
                useNewUrlParser: true, 
                useUnifiedTopology: true, 

                // useNewUrlParser: true,
                // useUnifiedTopology: true,
                // useFindAndModify: false,
                // useCreateIndex: true,
            }
        );
        console.log('Database is connected to:', db.connection.host);
    }catch(error){
        console.error(error);
    }
})();