import mongoose from "mongoose"; 
import { Schema, model } from "mongoose";

export const cartsCollectionName = "cart";

const cartsSchema = new mongoose.Schema({
    products:[{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'product' 
        },
        quantity: { type: Number, default: 1 },
         _id: false 
    }],
    default: []
});



export const CartModel = mongoose.model(
    cartsCollectionName,
    cartsSchema
);