import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const MODEL = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    notification_token: { type: String },
    created_at: { type: Date, default: Date.now },
});

export default mongoose.model("User", MODEL);
