const express = require('express');
const router = express.Router();
const Facture = require('../models/Facture');

// Créer une facture
router.post('/', async (req, res) => {
    try {
        const facture = new Facture(req.body);
        await facture.save();
        res.status(201).json(facture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lire toutes les factures
router.get('/', async (req, res) => {
    try {
        const factures = await Facture.find();
        res.json(factures);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lire une facture
router.get('/:id', async (req, res) => {
    try {
        const facture = await Facture.findById(req.params.id);
        res.json(facture);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mettre à jour une facture
router.put('/:id', async (req, res) => {
    try {
        const facture = await Facture.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(facture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer une facture
router.delete('/:id', async (req, res) => {
    try {
        await Facture.findByIdAndDelete(req.params.id);
        res.json({ message: "Facture supprimée" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Récupérer tous les IDs des détails de facture
router.get('/ids', async (req, res) => {
    try {
        const detailsFacture = await Facture.find({}, '_id');
        res.json(detailsFacture);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;