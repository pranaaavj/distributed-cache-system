"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const grpcProduct_1 = require("./grpcProduct");
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/product', (req, res) => {
    const id = req.body.id;
    grpcProduct_1.GrpcProductClient.getProduct({ id }, (err, data) => {
        if (err) {
            res.status(404).json({ error: err.message });
            return;
        }
        res.status(200).json({ data });
    });
});
app.post('/product', (req, res) => {
    const product = req.body.product;
    grpcProduct_1.GrpcProductClient.createProduct({ ...product }, (err, data) => {
        if (err) {
            res.status(404).json({ error: err.message });
            return;
        }
        res.status(200).json({ data });
    });
});
app.put('/product', (req, res) => {
    const product = req.body.product;
    grpcProduct_1.GrpcProductClient.updateProduct({ ...product }, (err, data) => {
        if (err) {
            res.status(404).json({ error: err.message });
            return;
        }
        res.status(200).json({ data });
    });
});
app.delete('/product', (req, res) => {
    const id = req.body.id;
    grpcProduct_1.GrpcProductClient.deleteProduct({ id }, (err, data) => {
        if (err) {
            res.status(404).json({ error: err.message });
            return;
        }
        res.status(200).json({ data });
    });
});
app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
});
//# sourceMappingURL=main.js.map