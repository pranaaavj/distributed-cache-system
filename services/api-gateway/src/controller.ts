import { Request, Response } from 'express';
import { GrpcProductClient } from './grpcProduct';

export const getProducts = (req: Request, res: Response) => {
  const id = req.body.id;

  GrpcProductClient.getProduct({ id }, (err, data) => {
    if (err) {
      return res.status(400).json({ message: 'Error getting product' });
    }

    return res.status(200).json({ product: data });
  });
};
