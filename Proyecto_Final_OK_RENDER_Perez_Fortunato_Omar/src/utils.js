import { dirname } from 'path';
import { fileURLToPath } from 'url';
export const _dirname = dirname(fileURLToPath(import.meta.url));
import { fakerES as faker } from '@faker-js/faker'



import bcrypt from "bcrypt";


export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

const categories = ["alimentos", "bebidas", "frutas","electrónica", "ropa", "muebles", "juguetes", "libros"];



export const generateProduct = () => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.number.int(),
        price: parseFloat (faker.commerce.price()),
        status: faker.datatype.boolean(),
        stock: faker.number.int({ min: 10, max: 100 }) ,
        category: faker.helpers.arrayElement(categories)

    }
}

