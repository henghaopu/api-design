import { Router, Response, Request } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from './modules/middleware';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from './handlers/product';
import {
  createUpdate,
  deleteUpdate,
  getUpdate,
  getUpdates,
  updateUpdate,
} from './handlers/update';

const router: Router = Router();

/**
 * Products
 */
router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.post(
  '/product',
  [body('name').isString(), handleInputErrors],
  createProduct,
);
router.put(
  '/products/:id',
  [body('name').isString(), handleInputErrors],
  updateProduct,
);
router.delete('/products/:id', deleteProduct);

/**
 * Updates
 */

router.get('/updates', getUpdates);
router.get('/updates/:id', getUpdate);
router.post(
  '/update',
  [
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
  ],
  createUpdate,
);
router.put(
  '/updates/:id',
  [
    body('title').exists().optional(),
    body('body').exists().optional(),
    body('status').isIn(['IN_PORGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional(),
  ],
  updateUpdate,
);
router.delete('/updates/:id', deleteUpdate);

/**
 * UpdatePoints
 */

router.get('/updatepoints', (req: Request, res: Response) => {
  throw new Error('error!!!');
});
router.get('/updatepoints/:id', (req: Request, res: Response) => {});
router.post(
  '/updatepoint',
  [
    body('name').optional().isString(),
    body('description').optional().isString(),
    body('updatedId').exists().isString(),
  ],
  (req: Request, res: Response) => {},
);
router.put(
  '/updatepoints/:id',
  [
    body('name').optional().isString(),
    body('description').optional().isString(),
  ],
  (req: Request, res: Response) => {},
);
router.delete('/updatepoints/:id', (req: Request, res: Response) => {});

router.use((err, req, res, text) => {
  console.log(err);
  res.json({ message: 'in router handler' });
});

export default router;
