import express from 'express';
import { GrpcProductClient } from './grpcProduct.js';
import { Request, Response } from 'express';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());

app.get('/product', (req: Request, res: Response) => {
  const id = req.body.id;

  GrpcProductClient.getProduct(id, (err, data) => {
    if (err) {
      res.status(404).json({ error: err.message });
      return;
    }

    res.status(200).json({ data });
  });
});

app.post('/product', (req: Request, res: Response) => {
  const product = req.body.product;

  GrpcProductClient.createProduct({ ...product }, (err, data) => {
    if (err) {
      res.status(404).json({ error: err.message });
      return;
    }

    res.status(200).json({ data });
  });
});

app.put('/product', (req: Request, res: Response) => {
  const product = req.body.product;

  GrpcProductClient.updateProduct({ ...product }, (err, data) => {
    if (err) {
      res.status(404).json({ error: err.message });
      return;
    }

    res.status(200).json({ data });
  });
});

app.delete('/product', (req: Request, res: Response) => {
  const id = req.body.id;

  GrpcProductClient.deleteProduct(id, (err, data) => {
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
