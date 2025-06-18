const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { randomBytes } = require('crypto');

let products = [
  {
    name: 'Mercedes',
    description: 'Luxury car',
    price: 100000,
    image: 'https://assets.gqindia.com/photos/6644932501e2ecdaa5138025/master/w_1600,c_limit/Bugatti-Divo.jpg',
    id: generateId()
  },
  {
    name: 'BMW',
    description: 'Luxury car',
    price: 100000,
    image: 'https://assets.gqindia.com/photos/6644932501e2ecdaa5138025/master/w_1600,c_limit/Bugatti-Divo.jpg',
    id: generateId()
  },
  {
    name: 'Lamborghini',
    description: 'Luxury car',
    price: 100000,
    image: 'https://assets.gqindia.com/photos/6644932501e2ecdaa5138025/master/w_1600,c_limit/Bugatti-Divo.jpg',
    id: generateId()
  }
];

const generateId = () => randomBytes(8).toString('hex');

// @route    POST api/products
// @desc     Create a product
// @access   Private
router.post(
  '/',
  check('name', 'Product name is required').notEmpty(),
  check('description', 'Please include a product image description').notEmpty(),
  check('price', 'Please include a product image description').notEmpty(),
  check('image', 'Please include a product image').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const product = await products.find(
        (product) => product.name == req.body.name
      );

      if (product) {
        return res
          .status(401)
          .json({ error: 'Product has already been added' });
      }

      const newProduct = {
        name: req.body.name,
        description: req.body.description,
        price: parseFloat(req.body.price),
        image: req.body.image
      };

      products.push(newProduct);

      res.json(newProduct);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/products
// @desc     Get all products
// @access   Private
router.get('/', async (req, res) => {
  try {
    console.log('Products!!')
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/products/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', async (req, res) => {
  try {
    const product = await product.find(
      (product) => product.id == req.params.id
    );

    if (!product) {
      return res.status(404).json({ msg: 'product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/products/:id
// @desc     Delete a product
// @access   Private
router.delete('/:id', async (req, res) => {
  try {
    const remainingProducts = products.filter(
      (product) => product.id !== req.params.id
    );
    

    if (remainingProducts.length === products.length) {
      return res.status(404).json({ msg: 'product not found' });
    }

    products = remainingProducts;

    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});
