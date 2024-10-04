import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {

  async getAll (name, page = 1, limit = 20, sort) {
    try {
      const filter = name ? { 'name': name } : {};
      let sortOrder = {};
      if (sort) sortOrder.price = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null;
      const paginateResponse = await ProductModel.paginate(filter, { page, limit, sort: sortOrder }) 
      
      const status = paginateResponse ? 'Status (201): Products found' : 'Status (505):Products not found'
      const next = paginateResponse.hasNextPage ? `http://localhost:8080/api/products/?page=${paginateResponse.nextPage}` : null
      const prev = paginateResponse.hasPrevPage ? `http://localhost:8080/api/products/?page=${paginateResponse.prevPage}` : null
      return ({
        status,
        payload: paginateResponse.docs,
        info: {
          count: paginateResponse.totalDocs,
          pages: paginateResponse.totalPages,
          hasPrevPage: paginateResponse.hasPrevPage,
          hasNextPage: paginateResponse.hasNextPage,
          next,
          prev
        }
      })
    } catch (error) {
      throw new Error(error);
    }
  }


 

  async getById(id) {
    try {
      const response = await ProductModel.findById(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(obj) {
    try {
      const response = await ProductModel.create(obj);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, obj) {
    try {
      const response = await ProductModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

}














