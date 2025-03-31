const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');

// Récupérer tous les IDs
router.get('/ids', async (req, res) => {
    try {
        const stocks = await Stock.find({}, '_id');
        const ids = stocks.map(stock => stock._id.toString());
        res.json(ids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Créer un stock
router.post('/', async (req, res) => {
    try {
        const stock = new Stock(req.body);
        await stock.save();
        res.status(201).json(stock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lire tous les stocks
router.get('/', async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lire un stock
router.get('/:id', async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.id);
        res.json(stock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mettre à jour un stock
router.put('/:id', async (req, res) => {
    try {
        const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(stock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer un stock
router.delete('/:id', async (req, res) => {
    try {
        await Stock.findByIdAndDelete(req.params.id);
        res.json({ message: "Stock supprimé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;