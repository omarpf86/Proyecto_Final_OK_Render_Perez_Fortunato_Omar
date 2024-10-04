import mongoose from "mongoose";
import { Schema, model } from "mongoose";

export const tiketCollectionName = "ticket";

const ticketSchema = new mongoose.Schema({
    code: { type: String, required: true },
    purchase_datetime: { type: String, required: true },
    list: [
        {
            name: {
            type: String,
            required: true,  
        }, 
            selectedQuantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,  
            },
         _id: false  
        }
    ],
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
} );

export const TicketModel = mongoose.model(
    tiketCollectionName,
    ticketSchema
);