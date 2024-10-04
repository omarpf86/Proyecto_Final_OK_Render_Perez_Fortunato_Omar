import * as mockingProductsService from "../services/mockingProducts.service.js";


export const mockingProducts = async (req, res, next) => {
    try {
        const {cant} = req.query
        const mockProducts = await mockingProductsService.createMockingProducts(cant);
        if (!mockProducts) res.status(404).json({ message: 'Error generate products' });
        else {
            res.json(mockProducts);
        }
    } catch (error) {
        next(error);
    }
}
