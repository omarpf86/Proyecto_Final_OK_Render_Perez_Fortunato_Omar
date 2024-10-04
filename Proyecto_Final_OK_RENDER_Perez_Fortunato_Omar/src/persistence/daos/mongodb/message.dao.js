import { messageModel } from "./models/message.model.js";


export default class MessageDaoMongoDB {
    async getAll() {
        try {
            const response = await messageModel.find({});
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }


    async create(obj) {
        try {
            const response = await messageModel.create(obj);
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }


}
