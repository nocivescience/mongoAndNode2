import { config } from "dotenv";
config();
const configurations = {
    PORT: process.env.PORT || 4000,
    MONGODB_HOST: process.env.MONGODB_HOST || "localhost",
    MONGODB_DATABASE: process.env.MONGODB_DATABASE || "test-notes",
    MONGODB_URI: `mongodb://${process.env.MONGODB_HOST||'localhost'}/${process.env.MONGODB_DATABASE||'test-notes'}`,
};
export default configurations;