import factory from '../daos/factory.js';
const { userDao } = factory;
import UserResDTO from '../dtos/user.res.dto.js';
import UserResDTO2 from '../dtos/user.res.dto2.js';

export default class UserRepository {
    constructor() {
        this.dao = userDao;
    }



    async getById(id) {
        try {
            const user = await this.dao.getUserById(id);
            if (user.role == "user" || user.role == "premium" ){
            const userDTO = new UserResDTO(user);
            return (userDTO)
            } else return user
        } catch (error) {
            throw new Error(error);
        }
    };

    async getAll() {
        try {
            const user = await this.dao.getAll();
            const userDTO = user.map(x => new UserResDTO2(x))
            return (userDTO)
        } catch (error) {
            throw new Error(error);
        }
    };


}