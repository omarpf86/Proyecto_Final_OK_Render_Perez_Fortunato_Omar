
import { createHash,isValidPassword } from "../utils.js";
import persistence from "../persistence/daos/factory.js";
const { userDao } = persistence;
import UserRepository from '../persistence/repository/user.repository.js';
import { sendGmail } from "./email.service.js";
const userRepository = new UserRepository();

const { cartDao } = persistence;

export const getUser = async (email) => {
    try {
        const user = await userDao.getUser(email);
        return user
    } catch (error) {
        throw new Error(error);
    }
};

export const getUserById = async (id) => {
    try {
        const user = await userRepository.getById(id)
        return user
    } catch (error) {
        throw new Error(error);
    }
};

export const getAll = async () => {
    try {
        const user = await userRepository.getAll();
        return user
    } catch (error) {
        throw new Error(error);
    }
};




export const register = async (user) => {
    try {
        const { email, password, isGithub } = user
        const cartUser = await cartDao.create();
        if (email === 'adminCoder@mail.com' && password === 'adminCoder123')
        {
            const newUser = await userDao.register({ ...user, password: createHash(password), role: 'admin', cart: cartUser._id })
               return newUser      
        } else {
               if (!isGithub) {
                   const newUserC = await userDao.register({ ...user, password: createHash(password), cart: cartUser._id})
                return newUserC
                }
                else { 
                   const newUserD = await userDao.register({ ...user, cart: cartUser._id })
                   return newUserD 
                    }
            }   
    } catch (error) {
        throw new Error(error.message);
    }
};


export const login = async (obj) => {
    try {
        const {email, password} = obj;
        const user = await userDao.login(email);
        if (isValidPassword(password, user)) {
            return user
        }else return null
    } catch (error) {
        throw new Error(error);
    }
};

export const deleteUser = async (id) => {
    try {
        return await userDao.deleteUser(id);
    } catch (error) {
        throw new Error(error);
    }
};

export const update = async (id, role) => {
    try {

        return await userDao.update(id, { role });
    } catch (error) {
        throw new Error(error);
    }
};



export const showInactiveUsers = async () => {
    try {
        const now = new Date();
        now.setMinutes(now.getMinutes() - 5);
        const users = await userDao.findUsers(now)
        return users
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteInactiveUsers = async () => {
    try {
        const users = await showInactiveUsers()
        const deleteUsers = await userDao.deleteInactiveUsers(users)
        if (deleteUsers) {
            const emailPromises = deleteUsers.map(async (x) => {
                let first_name = x.first_name;
                let email = x.email;
                let id= ""
                return sendGmail(first_name, email,id, 'deleteUsers'); 
            });
            await Promise.all(emailPromises); // Espera a que todas las promesas se resuelvan en paralelo  
        }
        return deleteUsers
    } catch (error) {
        throw new Error(error);
    }
}

