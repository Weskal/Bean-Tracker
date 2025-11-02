const Coffee = require('../models/Coffee');

// Create a new coffee entry
exports.createCoffee = async (req, res) => {
    try {
        newCoffee = await Coffee.create(req.body);
        res.status(201).json(newCoffee)
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

// List all registred coffees
exports.getAllCoffees = async (req, res) => {
    try {
        allCoffees = await Coffee.find();
        res.status(200).json(allCoffees)
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

// Get a coffee by id
exports.getCoffeeById = async (req, res) => {
    try {
        const coffee = await Coffee.findById(req.params.id);

        if (!coffee) {
            return res.status(404).json({error: 'Coffee not found'})
        }
        res.status(200).json(coffee)
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

// Update a coffee by id
exports.updateCoffeeById = async (req, res) => {
    try {
        const updatedCoffee = await Coffee.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        );

        if (!updatedCoffee) {
            return res.status(404).json({error: 'Coffee not found'})
        }
        res.status(200).json(updatedCoffee)
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};


// Delete a coffee by id
exports.deleteCoffeeById = async (req, res) => {
    try {
        const deletedCoffee = await Coffee.findByIdAndDelete(req.params.id);

        if (!deletedCoffee) {
            return res.status(404).json({error: 'Coffee not found'})
        }
        res.status(200).json(deletedCoffee)
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};