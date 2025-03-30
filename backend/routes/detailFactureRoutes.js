const express = require('express');
const router = express.Router();
const DetailFacture = require('../models/DetailFacture');

// Créer un détail de facture
router.post('/', async (req, res) => {
    try {
        const detailFacture = new DetailFacture(req.body);
        await detailFacture.save();
        res.status(201).json(detailFacture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lire tous les détails de facture
router.get('/', async (req, res) => {
    try {
        const detailsFacture = await DetailFacture.find();
        res.json(detailsFacture);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lire un détail de facture
router.get('/:id', async (req, res) => {
    try {
        const detailFacture = await DetailFacture.findById(req.params.id);
        res.json(detailFacture);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mettre à jour un détail de facture
router.put('/:id', async (req, res) => {
    try {
        const detailFacture = await DetailFacture.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(detailFacture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer un détail de facture
router.delete('/:id', async (req, res) => {
    try {
        await DetailFacture.findByIdAndDelete(req.params.id);
        res.json({ message: "Détail de facture supprimé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Récupérer tous les IDs des détails de facture
router.get('/ids', async (req, res) => {
    try {
        const detailsFacture = await DetailFacture.find({}, '_id');
        res.json(detailsFacture);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;