import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

export default class ProductDaoFS {
  constructor(path) {
    this.path = path;
    this.products = [] 
  }

    
   async getAll() {
      try {
        if (fs.existsSync(this.path)) {
          const products = await fs.promises.readFile(this.path, 'utf8')
          return JSON.parse(products)
        } else return []
      } catch (error) { console.log(error) }

    }

  async getById(id) {
    try {
      const products = await this.getProducts()//no uso this products= porque si no ya estaria cargando el array.
      const product = (products.find((x) => x.id === id))
      if (!product) return null
      return product
    } catch (error) { throw new Error("Producto no encontrado") }
  }

  async create(obj) {
    try {
      this.products = [...await this.getProducts()]
      const product = {
        id: uuidv4(),
        ...obj
      };
      this.products.push(product)
      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null))
      return product
    } catch (error) { throw new Error("Hubo un error en la creación del producto en el archivo") }
  }


  async update(obj, id) {
    try {
      console.log(this.products)
      this.products = [...await this.getProducts()]
      let product = await this.getProductById(id)
      if (!product) return null
      if (!obj.id) {
        product = { ...product, ...obj }
      } else {
        delete obj.id
        product = { ...product, ...obj }
      }
      this.products = this.products.filter((x) => x.id !== id)
      this.products.push(product)

      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null))
      return product

    } catch { throw new Error("El Producto no fue actualizado") }

  }

  async delete(id) {
    try {
      this.products = [...await this.getProducts()]
      if (this.products.length > 0) {
        const productExist = await this.getProductById(id)
        if (productExist) {
          this.products = this.products.filter((x) => x.id !== id)
          await fs.promises.writeFile(this.path, JSON.stringify(this.products))
          return productExist
        }
      } else return null
    } catch (error) { throw new Error("El Producto no pudo ser borrado") }
  }


}
