const express = require('express');
const router = express.Router();
const Tache = require('../models/Tache');

// Récupérer tous les IDs
router.get('/ids', async (req, res) => {
    try {
        const taches = await Tache.find({}, '_id');
        const ids = taches.map(tache => tache._id.toString());
        res.json(ids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Créer un détail de tache
router.post('/', async (req, res) => {
    try {
        const tache = new Tache(req.body);
        await tache.save();
        res.status(201).json(tache);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lire tous les détails de tache
router.get('/', async (req, res) => {
    try {
        const tache = await Tache.find();
        res.json(tache);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lire un détail de tache
router.get('/:id', async (req, res) => {
    try {
        const tache = await Tache.findById(req.params.id);
        res.json(tache);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mettre à jour un détail de tache
router.put('/:id', async (req, res) => {
    try {
        const tache = await Tache.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(tache);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer un détail de tache
router.delete('/:id', async (req, res) => {
    try {
        await Tache.findByIdAndDelete(req.params.id);
        res.json({ message: "Détail de tache supprimé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;