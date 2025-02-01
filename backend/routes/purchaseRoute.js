import express from 'express';
import { Purchase } from '../models/purchaseModel.js';

const router = express.Router();

// Route for Save a new purchase
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.price ||
      !request.body.purchaseDate
    ) {
      return response.status(400).send({
        message: 'Send all required fields: purchase, price, date',
      });
    }
    const newPurchase = {
      title: request.body.title,
      author: request.body.price,
      publishYear: request.body.purchaseDate,
    };

    const purchase = await Purchase.create(newPurchase);

    return response.status(201).send(purchase);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All purchases from database
router.get('/', async (request, response) => {
  try {
    const purchases = await Purchase.find({});

    return response.status(200).json({
      count: purchases.length,
      data: purchases,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One purchase from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const purchase = await Purchase.findById(id);

    return response.status(200).json(purchase);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a purchase
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.price ||
      !request.body.purchaseDate
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, price, purchaseDate',
      });
    }

    const { id } = request.params;

    const result = await Purchase.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Purchase not found' });
    }

    return response.status(200).send({ message: 'Purchase log updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a purchase
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Purchase.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Purchase not found' });
    }

    return response.status(200).send({ message: 'Purchase deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
