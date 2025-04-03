const express = require('express');
const router = express.Router();
const DetailDevis = require('../models/DetailDevis');

// Récupérer tous les IDs
router.get('/ids', async (req, res) => {
    try {
        const detailDevis = await DetailDevis.find({}, '_id');
        const ids = detailDevis.map(detail => detail._id.toString());
        res.json(ids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Créer un détail de Devis
router.post('/', async (req, res) => {
    try {
        const detailDevis = new DetailDevis(req.body);
        await detailDevis.save();
        res.status(201).json(detailDevis);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lire tous les détails de Devis
router.get('/', async (req, res) => {
    try {
        const filters = {};
        for (const key in req.query) {
            if (req.query.hasOwnProperty(key)) {
                filters[key] = req.query[key];
            }
        }
        const detailsDevis = await DetailDevis.find(filters);
        res.json(detailsDevis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lire un détail de Devis
router.get('/:id', async (req, res) => {
    try {
        const detailDevis = await DetailDevis.findById(req.params.id);
        res.json(detailDevis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mettre à jour un détail de Devis
router.put('/:id', async (req, res) => {
    try {
        const detailDevis = await DetailDevis.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(detailDevis);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer un détail de Devis
router.delete('/:id', async (req, res) => {
    try {
        await DetailDevis.findByIdAndDelete(req.params.id);
        res.json({ message: "Détail de Devis supprimé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;