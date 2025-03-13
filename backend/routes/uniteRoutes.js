const express = require('express');
const router = express.Router();
const Unite = require('../models/Unite');

// Créer une unité
router.post('/', async (req, res) => {
	try {
		const unite = new Unite(req.body);
		await unite.save();
		res.status(201).json(unite);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Lire toutes les unités
router.get('/', async (req, res) => {
	try {
		const unites = await Unite.find();
		res.json(unites);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Lire une unité
router.get('/:id', async (req, res) => {
	try {
		const unite = await Unite.findById(req.params.id);
		res.json(unite);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Mettre à jour une unité
router.put('/:id', async (req, res) => {
	try {
		const unite = await Unite.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.json(unite);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Supprimer une unité
router.delete('/:id', async (req, res) => {
	try {
		await Unite.findByIdAndDelete(req.params.id);
		res.json({ message: "Unité supprimée" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;