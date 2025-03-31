const express = require('express');
const router = express.Router();
const Salaire = require('../models/Salaire');

// Récupérer tous les IDs
router.get('/ids', async (req, res) => {
    try {
        const salaires = await Salaire.find({}, '_id');
        const ids = salaires.map(salaire => salaire._id.toString());
        res.json(ids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Créer un salaire
router.post('/', async (req, res) => {
    try {
        const salaire = new Salaire(req.body);
        await salaire.save();
        res.status(201).json(salaire);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lire tous les salaires
router.get('/', async (req, res) => {
    try {
        const salaires = await Salaire.find();
        res.json(salaires);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lire un salaire
router.get('/:id', async (req, res) => {
    try {
        const salaire = await Salaire.findById(req.params.id);
        res.json(salaire);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mettre à jour un salaire
router.put('/:id', async (req, res) => {
    try {
        const salaire = await Salaire.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(salaire);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer un salaire
router.delete('/:id', async (req, res) => {
    try {
        await Salaire.findByIdAndDelete(req.params.id);
        res.json({ message: "Salaire supprimé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;