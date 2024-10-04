import mongoose from "mongoose";

export const messagesCollectionName = "messages";

const messagesSchema = new mongoose.Schema({
    username: { type: String, required: true },
    message: { type: String, required: true },
});

export const messageModel = mongoose.model(
    messagesCollectionName,
    messagesSchema
);