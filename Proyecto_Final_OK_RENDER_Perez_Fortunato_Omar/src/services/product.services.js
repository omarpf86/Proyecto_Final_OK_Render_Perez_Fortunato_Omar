
import persistence from "../persistence/daos/factory.js"; 
const { prodDao } = persistence
import { logger } from '../utils/logger.js'
import { getUser } from "./user.services.js";
import { sendGmail } from "./email.service.js";




export const getAll = async (name, page, limit,sort) => {
  try {
    return await prodDao.getAll(name, page, limit, sort);
  } catch (error) {
    throw new Error(error);
  }
};



export const getById = async (id) => {
  try {
    return await prodDao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const create = async (obj) => {
  try {
    logger.info("from product.service.js, el pedido llego a product service")
    return await prodDao.create(obj);
  } catch (error) {
    throw new Error(error);
  }
};

export const update = async (id,owner,role,email,obj) => {
  try {
    console.log("en product.service.js", owner)
    if (role == "admin") {
      if (owner == "admin") {
        return await prodDao.update(id, obj)
      }
      else { return null }
    }
    if (role == "premium") {
      if (email == owner) {
        return await prodDao.update(id, obj)
      }
      else { return null }
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const updateStock = async (id,  obj) => {
  try {
        return await prodDao.update(id, obj)
  }
  catch (error) {
  throw new Error(error);
  }
};




export const remove = async (id,owner,email,role) => {
  try {
    let user = "";
    console.log ("en product.service.js", owner)
    if (role == "admin") {
      if (owner == "admin") { 
        return await prodDao.delete(id);
      }
      if (owner != "admin") { 
        user = await getUser(owner)
        console.log("en product.service.js", user)
        let first_name = user.first_name
        let email = user.email
        const prodDelete = await prodDao.delete(id);
        console.log("en product.service el prodDelete.js", prodDelete)
        await sendGmail(first_name, email, id, 'deleteProducts')
        return prodDelete
      }
    }
    if (role=="premium") { 
      if (email == owner) {
        user = await getUser(owner)
        console.log("en product.service.js", user)
        let first_name = user.first_name
        let email = user.email
        const prodDelete = await prodDao.delete(id);
        console.log("en product.service el prodDelete.js", prodDelete)
        await sendGmail(first_name, email, id, 'deleteProducts')
        return prodDelete }
      if (email != owner) {return null }
    }
  } catch (error) {
    throw new Error(error);
  }
};
