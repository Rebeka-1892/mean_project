const express = require('express');
const router = express.Router();
const FormulePoste = require('../models/FormulePoste');

// Créer une formule de poste
router.post('/', async (req, res) => {
    try {
        const formulePoste = new FormulePoste(req.body);
        await formulePoste.save();
        res.status(201).json(formulePoste);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lire toutes les formules de poste
router.get('/', async (req, res) => {
    try {
        const formulesPoste = await FormulePoste.find();
        res.json(formulesPoste);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lire une formule de poste
router.get('/:id', async (req, res) => {
    try {
        const formulePoste = await FormulePoste.findById(req.params.id);
        res.json(formulePoste);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mettre à jour une formule de poste
router.put('/:id', async (req, res) => {
    try {
        const formulePoste = await FormulePoste.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(formulePoste);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer une formule de poste
router.delete('/:id', async (req, res) => {
    try {
        await FormulePoste.findByIdAndDelete(req.params.id);
        res.json({ message: "Formule de poste supprimée" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;