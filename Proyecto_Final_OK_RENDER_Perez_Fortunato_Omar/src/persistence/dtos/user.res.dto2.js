export default class UserResDTO2 {
    constructor(user) {
        this.nombre = user.first_name;
        this.email = user.email;
        this.rol = user.role
    }
}