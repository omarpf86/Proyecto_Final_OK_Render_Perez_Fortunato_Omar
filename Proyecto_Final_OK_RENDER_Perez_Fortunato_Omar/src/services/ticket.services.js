

import * as cartService from "./cart.services.js";
import * as productService from "./product.services.js";

import TicketDaoMongo from "../persistence/daos/mongodb/ticket.dao.js";
const ticketDao= new TicketDaoMongo()


  
        export const generateTicket = async (user) => {
            try {
            const cart = await cartService.getById(user.cid);
            if (!cart) return null;

            let amountAcc = 0;
            let purcharsedProducts = [] 
            let stockIssues = [];    
            if (cart.products.length > 0) {
                for (const x of cart.products) {
                    const idProd = x.product._id;//tuve que agregaar el id porq el cart tien el populate
                    const prodDB = await productService.getById(idProd);

                    

                    if (x.quantity > prodDB.stock) {
                        stockIssues.push({
                            product: prodDB.name,
                            availableStock: prodDB.stock,
                            requestedQuantity: x.quantity
                        });
                        continue; 
                    }
                    console.log ("insufucuentestock",stockIssues)
                    if (x.quantity <= prodDB.stock) {
                        let name = prodDB.name
                        //console.log("en ticket service name es", name)
                        let price = prodDB.price
                        let selectedQuantity= x.quantity
                        purcharsedProducts.push({ name,selectedQuantity, price })
                        const amount = x.quantity * prodDB.price;
                        let newStock = (prodDB.stock - x.quantity)
                        console.log("en ticket service el newstock es", newStock)
                        const updatedProduct = await productService.updateStock(idProd, { stock: newStock }) //Si no agrego el await, la promesa se inicia pero no esperas a que se resuelva, por lo que updatedProduct es una promesa pendiente en lugar del valor resuelto.
                        console.log("en ticket service updateProduct es ", updatedProduct)
                    
                        
                       amountAcc += amount;
                    } else return null;
                }
            }
            console.log("en ticket service purchasedproducts es", purcharsedProducts)
            
            if (stockIssues.length > 0) {
                    return  {
                        message: "Algunos productos no tienen suficiente stock.",
                        stockIssues
                    };
            }
            else {
                const ticket = await ticketDao.create({
                    code: `${Math.floor(Math.random() * 1000)}`,
                    purchase_datetime: new Date().toLocaleString(),
                    list: purcharsedProducts,
                    amount: amountAcc,
                    purchaser: user.email,
                });

                await cartService.clearCart(user.cid);

                return ticket;
            }    

        } catch (error) {
            throw new Error(error);
        }
    }
