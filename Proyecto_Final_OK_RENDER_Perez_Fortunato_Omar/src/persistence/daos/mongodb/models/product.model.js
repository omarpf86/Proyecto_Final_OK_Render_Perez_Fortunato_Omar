import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
import { Schema, model } from "mongoose";

export const productsCollectionName = "product";

const productsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    owner: { type: String, default: "admin" },
});

productsSchema.plugin(mongoosePaginate)

export const ProductModel = mongoose.model(
    productsCollectionName,
    productsSchema
);