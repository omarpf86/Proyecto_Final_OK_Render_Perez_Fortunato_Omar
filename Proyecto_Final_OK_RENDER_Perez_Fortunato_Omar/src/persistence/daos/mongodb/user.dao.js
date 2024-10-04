
import { UserModel } from "./models/user.model.js";


export default class UserDaoMongoDB {
   

    async getUser(email) {
        try {
            const user = await UserModel.findOne({ email})
            return user;
            }catch (error) {
            throw new Error(error);
        }
    }

    async getUserById(id) {
        try {
            const user = await UserModel.findOne({ _id: id }).populate("cart") 
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAll() {
        try {
            const response = await UserModel.find({});
            return response;
        } catch (error) { throw new Error(error) }

    }


    async register(user) {
        try {
            const response = await UserModel.create(user); 
            return response;
        } catch (error) { throw new Error("Error in user creation") }
    }


    async login(email) {
        try {
            const response = await UserModel.findOne({ email }); 
            return response
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteUser(id) {
        try {
            const response = await UserModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    async update(id, obj) {
        try {
            const response = await UserModel.findByIdAndUpdate(id, obj, {
                new: true,
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async findUsers(now) {
        try {
            const response = await UserModel.find({ lastConnection: { $lt: now } })
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteInactiveUsers(users) {
        try {
            const deleteUsers =  users.map(x => UserModel.findByIdAndDelete(x._id))
            const response = await Promise.all(deleteUsers)
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }



}    



