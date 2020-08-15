import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const MODEL = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: [{ url: { type: String, required: true } }],
    category: { type: String, enum: ["furniture", "camera", "laptop", "vehicles", "fitness", "other"], default: "other" },
    created_at: { type: Date, default: Date.now },
    location: { latitude: { type: String }, longitude: { type: String } }
});

export default mongoose.model("Product", MODEL);
