import { Router, type RequestHandler } from 'express';
import type { Model } from 'mongoose';
import { isDatabaseConnected } from '../config/database.js';

export function createResourceRouter(resourceModel: Model<unknown>): Router {
  const router = Router();

  const requireDatabase: RequestHandler = (_request, response, next) => {
    if (!isDatabaseConnected()) {
      response.status(503).json({ error: 'Database is unavailable' });
      return;
    }
    next();
  };

  router.get('/', requireDatabase, async (_request, response, next) => {
    try {
      response.json(await resourceModel.find().lean().exec());
    } catch (error) {
      next(error);
    }
  });

  router.post('/', requireDatabase, async (request, response, next) => {
    try {
      const resource = await resourceModel.create(request.body);
      response.status(201).json(resource);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
