const express = require('express');
const router = express.Router();
const {createCoffee, getAllCoffees, getCoffeeById, updateCoffeeById, deleteCoffeeById} = require('../controllers/coffeeController');

// Create new coffee
router.post('/', createCoffee);

// List all coffees
router.get('/', getAllCoffees);

// Get coffee by id
router.get('/:id', getCoffeeById);

// Update coffe by id
router.put('/:id', updateCoffeeById);

router.delete('/:id', deleteCoffeeById);


module.exports = router;
// app.put('/api/coffees/:id', (req, res) => {
//     res.json({requestBody: req.body.id});
// });