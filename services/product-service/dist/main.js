"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_1 = require("./generated/product");
const products_1 = require("./products");
const grpc = __importStar(require("@grpc/grpc-js"));
const grpcCache_1 = require("./grpcCache");
class ProductService {
    async getProduct(call, callback) {
        const id = call.request.id;
        try {
            const cachedProduct = await grpcCache_1.GrpcCacheClient.getCache({ key: id });
            if (cachedProduct) {
                callback(null, cachedProduct);
                return;
            }
            const product = products_1.products.find((curr) => curr.id == id);
            if (!product) {
                callback({ name: 'Error', message: 'No product found' });
                return;
            }
            await grpcCache_1.GrpcCacheClient.setCache({
                key: product.id,
                value: product,
                ttlSeconds: 3000,
            });
            callback(null, product);
        }
        catch (error) {
            console.log(error);
            callback({ code: grpc.status.INTERNAL, message: 'There was some error' });
        }
    }
    createProduct(call, callback) {
        const { name, category, description, price, stock } = call.request;
        const product = {
            id: `prod${products_1.products.length + 1}`,
            name,
            category,
            description,
            price,
            stock,
        };
        products_1.products.push(product);
        callback(null, product);
    }
    async updateProduct(call, callback) {
        const { id, name, category, description, price, stock } = call.request;
        const product = products_1.products.find((curr) => curr.id == id);
        if (!product) {
            callback({ name: 'Error', message: 'No product found' });
            return;
        }
        product.name = name ?? product.name;
        product.category = category ?? product.category;
        product.description = description ?? product.description;
        product.price = price ?? product.price;
        product.stock = stock ?? product.stock;
        await grpcCache_1.GrpcCacheClient.InvalidateCache({
            key: product.id,
        });
        callback(null, product);
    }
    async deleteProduct(call, callback) {
        const id = call.request.id;
        const product = products_1.products.find((product) => product.id == id);
        if (!product) {
            callback({ message: 'Product does not exist', name: 'Error' });
            return;
        }
        const index = products_1.products.findIndex((product) => product.id === id);
        products_1.products.splice(index, 1);
        await grpcCache_1.GrpcCacheClient.InvalidateCache({
            key: product.id,
        });
        callback(null, {
            message: 'Product deleted successfully',
        });
    }
}
exports.ProductService = ProductService;
const PRODUCT_SERVICE_PORT = 50051;
const server = new grpc.Server();
server.addService(product_1.ProductServiceService, new ProductService());
server.bindAsync(`0.0.0.0:${PRODUCT_SERVICE_PORT}`, grpc.ServerCredentials.createInsecure(), (err) => {
    if (err)
        return console.log('There was some error.');
    console.log('Product service started');
});
//# sourceMappingURL=main.js.map