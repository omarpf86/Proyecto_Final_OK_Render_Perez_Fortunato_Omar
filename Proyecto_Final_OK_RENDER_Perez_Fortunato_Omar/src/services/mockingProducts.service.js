import mockingProductsDaoMongo from "../persistence/daos/mongodb/mockingProducts.dao.js"
import { generateProduct } from "../utils.js";
const mockingProductDao = new mockingProductsDaoMongo();


export const createMockingProducts = async (cant) => {
    try {
        const products= []
        for (let i = 0; i < cant; i++) {
            const product = generateProduct()
            products.push(product)    
        }  
        return await mockingProductDao.createProduct(products)
    } catch (error) {
        throw new Error(error);
    }
}