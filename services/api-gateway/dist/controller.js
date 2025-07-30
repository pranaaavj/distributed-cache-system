"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = void 0;
const grpcProduct_1 = require("./grpcProduct");
const getProducts = (req, res) => {
    const id = req.body.id;
    grpcProduct_1.GrpcProductClient.getProduct({ id }, (err, data) => {
        if (err) {
            return res.status(400).json({ message: 'Error getting product' });
        }
        return res.status(200).json({ product: data });
    });
};
exports.getProducts = getProducts;
//# sourceMappingURL=controller.js.map