import mongoose from 'mongoose';
import { Schema, model } from "mongoose";

export const usersCollectionName = "users";

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'    
    },
    lastConnection: {
        type: Date,
        default: Date.now
    },
    isGithub: {
        type: Boolean,
        default: false
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "cart",
        default: null
    }

});

export const UserModel = mongoose.model(
    usersCollectionName,
    UserSchema);