import * as service from "../services/product.services.js";
import mongoose from 'mongoose';
import { HttpResponse } from "../utils/http.response.js";
import { resolveContent } from "nodemailer/lib/shared/index.js";
const httpResponse = new HttpResponse()


export const getAll = async (req, res, next) => {
    try {
        const { name } = req.query
        const { page } = req.query
        const { limit } = req.query
        const { sort } = req.query
        
       
        const response = await service.getAll(name, page, limit,sort)
        return httpResponse.Ok(res,response)
    } catch (error) {  
        next(error.message);
    }
};




export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) return httpResponse.BadRequest(res, id)
        const prod = await service.getById(id);
        if (!prod) return httpResponse.NotFound(res,prod)
        else return httpResponse.Ok(res,prod)
    } catch (error) {
        next(error.message);
    }
};

export const create = async (req, res, next) => {
    try {
        const role = req.user.role
        let owner = "";
        role == "premium" ? owner = req.user.email : owner = "admin"
        const newProd = await service.create({ ...req.body, owner });
        if (!newProd) return httpResponse.BadRequest(res,newProd)
        else return  httpResponse.Ok(res, newProd)
    } catch (error) {
        next(error.message);
    }
};

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const email = req.user.email
        const role = req.user.role
        if (!id || !mongoose.Types.ObjectId.isValid(id)) return httpResponse.BadRequest(res, id)
        const product = await service.getById(id)
        const owner = product.owner
        const prodUpd = await service.update(id,owner,role,email, req.body);
        
        if (prodUpd === null) {
            return httpResponse.Forbidden(res, prodUpd);
        }
        if (!prodUpd) {
            return httpResponse.NotFound(res, prodUpd)
        }
        else return httpResponse.Ok(res, prodUpd)
    } catch (error) {
        next(error.message);
    }
};

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const email = req.user.email
        const role = req.user.role
        if (!id || !mongoose.Types.ObjectId.isValid(id)) return httpResponse.BadRequest(res, id)
        const product = await service.getById(id)
        const owner = product.owner
        const prodDel = await service.remove(id, owner, email, role);
        if (prodDel === null) {
            return httpResponse.Forbidden(res, prodDel);
        }
        if (!prodDel) {
            return httpResponse.NotFound(res, prodDel)
        }
        else return httpResponse.Ok(res,prodDel)
    } catch (error) {
        next(error.message);
    }
};