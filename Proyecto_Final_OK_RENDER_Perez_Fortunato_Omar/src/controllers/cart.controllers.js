import * as service from "../services/cart.services.js";
import mongoose from 'mongoose';
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse ()


export const create = async (req, res, next) => {
    try {
        const newCart = await service.create();
        if (!newCart) return httpResponse.BadRequest(res,newCart)
        else return httpResponse.Ok(res,newCart)
    } catch (error) {
        next(error.message);
    }
};


export const getAll = async (req, res, next) => {
    try {
        const response = await service.getAll();
        return httpResponse.Ok(res,response)
    } catch (error) {
        next(error.message);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { cid } = req.params;
        if (!cid || !mongoose.Types.ObjectId.isValid(cid)) return httpResponse.BadRequest(res,cid)
        const cart = await service.getById(cid);
        if (!cart) return httpResponse.NotFound(res,cart)
        else return httpResponse.Ok(res,cart)
    } catch (error) {
        next(error.message);
    }
};



export const addProdToCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { id } = req.params;
        if (!cid || !mongoose.Types.ObjectId.isValid(cid)) return httpResponse.BadRequest(res, cid)
        if (!id || !mongoose.Types.ObjectId.isValid(id)) return httpResponse.BadRequest(res, id)
        const response = await service.addProdToCart(cid,id);
        if (!response) return httpResponse.NotFound(res,response);
        else return httpResponse.Ok (res,response)
    } catch (error) {
        next(error.message);
    }
};

export const updateProdQuantityToCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { id } = req.params;
        const { quantity } = req.body;
        if (!cid || !mongoose.Types.ObjectId.isValid(cid)) return httpResponse.BadRequest(res, cid)
        if (!id || !mongoose.Types.ObjectId.isValid(id)) return httpResponse.BadRequest(res, id)
        const response = await service.updateProdQuantityToCart(cid, id, quantity);
        if (!response) return httpResponse.NotFound(res,response)
        else return httpResponse.Ok(res,response)
    } catch (error) {
        next(error.message);
    }
};

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) return httpResponse.BadRequest(res, id)
        const cartUpd = await service.update(id, req.body);
        if (!cartUpd) return httpResponse.NotFound(res,cartUpd)
        else return httpResponse.Ok(res, cartUpd)
    } catch (error) {
        next(error.message);
    }
};






export const clearCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        if (!cid || !mongoose.Types.ObjectId.isValid(cid)) return httpResponse.BadRequest(res, cid)
        const response = await service.clearCart(cid);
        if (!response) return httpResponse.NotFound(res,response)
        else return httpResponse.Ok(res,response)
    } catch (error) {
        next(error.message);
    }
};

export const removeProdToCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { id } = req.params;
        if (!cid || !mongoose.Types.ObjectId.isValid(cid)) return httpResponse.BadRequest(res, cid)
        if (!id || !mongoose.Types.ObjectId.isValid(id)) return httpResponse.BadRequest(res, id)
        const response = await service.removeProdToCart(cid, id);
        if (!response) return httpResponse.NotFound(res,response)
        else return httpResponse.Ok (res,response)
    } catch (error) {
        next(error.message);
    }
};






export const deleteCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        if (!cid || !mongoose.Types.ObjectId.isValid(cid)) return httpResponse.BadRequest(res, cid)
        const cartDel = await service.deleteCart(cid);
        if (!cartDel) return httpResponse.NotFound(res, cartDel)
        else return httpResponse.Ok(res,cartDel)
    } catch (error) {
        next(error.message);
    }
};