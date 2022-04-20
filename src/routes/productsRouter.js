const express = require('express');

const router = express.Router();

const ProductsService = require('../services/productsServices');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/productSchema');

const service = new ProductsService();

router.get('/', (req, res) => {
  service
    .find()
    .then((product) => res.json(product))
    .catch((err) => res.status(500).send('Internal Error', err));
});

router.get(
  '/:id',

  validatorHandler(getProductSchema, 'params'),

  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',

  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const { body } = req;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const productUpdated = await service.update(id, body);
      res.json(productUpdated);
    } catch (error) {
      next(error);
      //res.status(404).send(error.message);
    }
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const productDeleted = await service.delete(id);
  res.json(productDeleted);
});

module.exports = router;
