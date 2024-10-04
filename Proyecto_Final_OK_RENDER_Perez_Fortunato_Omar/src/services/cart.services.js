
import persistence from "../persistence/daos/factory.js";
const { cartDao, prodDao } = persistence


export const create = async (obj) => {
    try {
        return await cartDao.create(obj);
    } catch (error) {
        throw new Error(error);
    }
};



export const getAll = async () => {
    try {
        return await cartDao.getAll();
    } catch (error) {
        throw new Error(error);
    }
};

export const getById = async (cid) => {
    try {
        return await cartDao.getById(cid);
    } catch (error) {
        throw new Error(error);
    }
};



export const addProdToCart = async (cid,id) => {
    try {
        const exists = await prodDao.getById(id)
        if (!exists) return null
        else return await cartDao.addProdToCart(cid,id)
    } catch (error) {
        throw new Error(error);
    }
};


export const updateProdQuantityToCart = async (cid, id,quantity) => {
    try { 
        return await cartDao.updateProdQuantityToCart(cid, id,quantity) 
    } catch (error) {
        throw new Error(error);
    }
};

export const update = async (id, obj) => {
    try {
        const cartUpd = await cartDao.update(id, obj);
        if (!cartUpd) return false;
        else return cartUpd;
    } catch (error) {
        console.log(error);
    }
};



export const clearCart = async (cid) => {
    try {
        return await cartDao.clearCart(cid)
        
    } catch (error) {
        throw new Error(error);
    }
};


export const removeProdToCart = async (cid, id) => {
    try {
        return await cartDao.removeProdToCart(cid, id)

    } catch (error) {
        throw new Error(error);
    }
};


export const deleteCart = async (cid) => {
    try {
        return await cartDao.deleteCart(cid);
    } catch (error) {
        throw new Error(error);
    }
};
