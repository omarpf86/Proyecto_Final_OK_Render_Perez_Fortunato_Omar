import { CartModel } from "./models/cart.model.js";
import { ProductModel } from "./models/product.model.js";

export default class CartsDaoMongodb {

    async create(obj) {
        try {
            const response = await CartModel.create(obj);
            return response;
        } catch (error) { throw new Error("Hubo un error en la creación del carrito") }
    }


    async getAll() {
        try {
            const response = await CartModel.find({});
            return response;  
        } catch (error) { throw new Error(error) }

    }


    async getById(cid) {
        try {
            const response = await CartModel.findById(cid).populate("products.product");
            return response;
        } catch (error) { throw new Error("Producto no encontrado") }
    }


   async addProdToCart(cid, id) {
        try {
            const cart = await CartModel.findById(cid)
            if (cart) {
                const pIncart = cart.products.find((x) => x.product == id)
                if (!pIncart) {
                    return await CartModel.findByIdAndUpdate(
                        cid,
                        { $push: { products: { product: id, quantity: 1 } } },
                        { new: true }
                    )
                } else {
                    return await CartModel.findOneAndUpdate(
                        { _id: cid, "products.product": id },
                        { $inc: { "products.$.quantity": 1 } },
                        { new: true }
                    )
                };
            }
        } catch (error) { throw new Error("It was not possible to add the      product to the cart") }
    }


    async updateProdQuantityToCart(cid, id,quantity) {
        try {
            const cart = await CartModel.findById(cid)
            if (cart) {
                const product = await ProductModel.findById(id)
                if (product) { 
                    const pIncart = cart.products.find((x) => x.product == id) 
                    if (!pIncart) {
                        return await CartModel.findByIdAndUpdate(
                            cid,
                            { $push: { products: { product: id, quantity:parseInt(quantity) } } },
                            { new: true }
                        )
                    } else if (pIncart) {
                        return await CartModel.findOneAndUpdate(
                            { _id: cid, "products.product": id },
                            { $inc: { "products.$.quantity": (parseInt(quantity)) } },
                            { new: true }
                        )
                    }

                }
            }
        } catch (error) { throw new Error("Product could not be added") }
    }

    async update(id, obj) {
        try {
            const response = await CartModel.findByIdAndUpdate(id, obj, {
                new: true,
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }




    async clearCart(cid) {
        try {
             return await CartModel.findOneAndUpdate(
                { _id: cid },
                { $set: { products: [] } },
                { new: true }
                    )
            } catch (error) { throw new Error("Producto no encontrado") }
    }



    async removeProdToCart(cid, id) {
        try {
            const cart = await CartModel.findById(cid)
           if (cart) {
               const pIncart = cart.products.find((x) => x.product == id)
                if (pIncart.quantity > 0) {
                    return await CartModel.findOneAndUpdate(
                        { _id: cid },
                        { $pull: { products: { product: id } } },
                        { new: true }
                        
                    )
                };
            }
        } catch (error) { throw new Error("Product could not be removed ") }
    }

    

    async deleteCart(cid) {
        try {
            const response = await CartModel.findByIdAndDelete(cid);
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
      

}


