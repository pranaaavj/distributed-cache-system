import { ProductServiceService, } from '@system/proto-contracts/src';
import { products } from './products';
import * as grpc from '@grpc/grpc-js';
import { GrpcCacheClient } from './grpcCache';
export class ProductService {
    async getProduct(call, callback) {
        const id = call.request.id;
        try {
            const cachedProduct = await GrpcCacheClient.getCache({ key: id });
            if (cachedProduct) {
                callback(null, cachedProduct);
                return;
            }
            const product = products.find((curr) => curr.id == id);
            if (!product) {
                callback({ name: 'Error', message: 'No product found' });
                return;
            }
            await GrpcCacheClient.setCache({
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
            id: `prod${products.length + 1}`,
            name,
            category,
            description,
            price,
            stock,
        };
        products.push(product);
        callback(null, product);
    }
    async updateProduct(call, callback) {
        const { id, name, category, description, price, stock } = call.request;
        const product = products.find((curr) => curr.id == id);
        if (!product) {
            callback({ name: 'Error', message: 'No product found' });
            return;
        }
        product.name = name ?? product.name;
        product.category = category ?? product.category;
        product.description = description ?? product.description;
        product.price = price ?? product.price;
        product.stock = stock ?? product.stock;
        await GrpcCacheClient.InvalidateCache({
            key: product.id,
        });
        callback(null, product);
    }
    async deleteProduct(call, callback) {
        const id = call.request.id;
        const product = products.find((product) => product.id == id);
        if (!product) {
            callback({ message: 'Product does not exist', name: 'Error' });
            return;
        }
        const index = products.findIndex((product) => product.id === id);
        products.splice(index, 1);
        await GrpcCacheClient.InvalidateCache({
            key: product.id,
        });
        callback(null, {
            message: 'Product deleted successfully',
        });
    }
}
const PRODUCT_SERVICE_PORT = 50051;
const server = new grpc.Server();
server.addService(ProductServiceService, new ProductService());
server.bindAsync(`0.0.0.0:${PRODUCT_SERVICE_PORT}`, grpc.ServerCredentials.createInsecure(), (err) => {
    if (err)
        return console.log('There was some error.');
    console.log('Product service started');
});
