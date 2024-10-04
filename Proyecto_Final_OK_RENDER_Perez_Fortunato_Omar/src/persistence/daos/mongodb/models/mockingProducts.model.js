import mongoose from "mongoose";


export const mockingProductsCollection = "mockingProducts";

const productsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
});



export const MockingProductModel = mongoose.model(
    mockingProductsCollection,
    productsSchema
);