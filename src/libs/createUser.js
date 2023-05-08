import User from '../models/User';
export const createAdminUser = async () => {
    const userFound = await User.findOne({email: "admin@localhost"});
    if(userFound) return; // if userFound is true, it means that the admin user already exists
    const newUser = new User({
        username: "admin",
        email: "admin@localhost",
    })
    newUser.password = await newUser.encryptPassword("admin");
    const admin = await newUser.save();
    console.log('Admin User Created', admin);
};