const express = require('express');
const router = express.Router();
const Materiel = require('../models/Materiel');

// Créer un matériel
router.post('/', async (req, res) => {
    try {
        const materiel = new Materiel(req.body);
        await materiel.save();
        res.status(201).json(materiel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lire tous les matériels
router.get('/', async (req, res) => {
    try {
        const materiels = await Materiel.find();
        res.json(materiels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lire un matériel
router.get('/:id', async (req, res) => {
    try {
        const materiel = await Materiel.findById(req.params.id);
        res.json(materiel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mettre à jour un matériel
router.put('/:id', async (req, res) => {
    try {
        const materiel = await Materiel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(materiel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer un matériel
router.delete('/:id', async (req, res) => {
    try {
        await Materiel.findByIdAndDelete(req.params.id);
        res.json({ message: "Matériel supprimé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Récupérer tous les IDs des matériels
router.get('/ids', async (req, res) => {
    try {
        const materiels = await Materiel.find({}, '_id');
        res.json(materiels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;