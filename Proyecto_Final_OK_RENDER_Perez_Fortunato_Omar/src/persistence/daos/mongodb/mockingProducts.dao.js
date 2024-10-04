import { MockingProductModel } from "./models/mockingProducts.model.js";

export default class mockingProductsDaoMongo {
    async createProduct(obj) {
        try {
            const response = await MockingProductModel.create(obj)
            return response;
        } catch (error) { throw new Error("Hubo un error en la creación de los prodcutos") }
    }

};