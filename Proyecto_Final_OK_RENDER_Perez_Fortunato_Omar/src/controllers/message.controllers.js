import * as service from "../services/message.services.js";

export const getAll = async (req, res, next) => {
    try {
        const response = await service.getAll();
        res.json(response);
    } catch (error) {
        next(error.message);
    }
};

