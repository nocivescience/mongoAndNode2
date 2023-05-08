import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
const UserSchema = new Schema({
    username: {type: String, unique: true },
    email: {type: String, unique: true , unique:true, trim: true},
    password: {type: String, required: true, required: true},
    date: {type: Date, default: Date.now}
},{
    timestamps: true,
    versionKey: false
})
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
export default model('User', UserSchema);