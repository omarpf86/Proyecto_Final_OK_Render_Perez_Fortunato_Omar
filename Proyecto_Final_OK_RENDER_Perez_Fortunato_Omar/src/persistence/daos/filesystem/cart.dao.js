import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';


export default class CartDaoFS {


    constructor(path) {
        this.path = path
        this.carts = []
    }


    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const carts = await fs.promises.readFile(this.path, 'utf8')
                return JSON.parse(carts)
            } else return []
        } catch (error) { console.log(error) }

    }


    async createCarts() {
        try {
            this.carts = [...await this.getCarts()]
            const cart = {
                cid: uuidv4(),
                product: []
            };
            this.carts.push(cart)
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null))
            return cart
        } catch (error) { throw new Error("Hubo un error en la creación del carrito") }
    }

    async getCartById(cid) {
        try {
            const carts = await this.getCarts()//no uso this products= porque si no ya estaria cargando el array.
            const cart = (carts.find((x) => x.cid === cid))
            if (!cart) return null
            return cart
        } catch (error) { throw new Error("Producto no encontrado") }
    }


    async pushProductInCart(cid, id) {
        try {
            let products = await fs.promises.readFile('./src/data/products.json', 'utf8')
            let products1 = JSON.parse(products)
            const product1 = (products1.find((x) => x.id === id))
            console.log(product1)
            const cart = await this.getCartById(cid)
            if (product1 && cart) {
                let pc = cart.product.find((x) => x.pid == id)
                if (!pc) {
                    cart.product.push({ pid: id, cantidad: 1 })
                } else {

                    pc.cantidad++
                }
                const carts = await this.getCarts()
                const newcarts = carts.filter((x) => x.cid !== cid)
                newcarts.push(cart)
                await fs.promises.writeFile(this.path, JSON.stringify(newcarts, null))
                return cart
            }
        } catch (error) { throw new Error("Producto no encontrado") }
    }

    async delete(cid) {
        try {
            this.carts = [...await this.getCarts()]
            if (this.carts.length > 0) {
                const cartExist = await this.getCartById(cid)
                if (cartExist) {
                    this.carts = this.carts.filter((x) => x.cid !== cid)
                    await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
                    return cartExist
                }
            } else return null
        } catch (error) { throw new Error("El Carrito no pudo ser borrado") }
    }







}

