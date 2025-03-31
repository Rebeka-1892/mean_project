const express = require('express');
const router = express.Router();
const FormuleMateriel = require('../models/FormuleMateriel');

// Récupérer tous les IDs
router.get('/ids', async (req, res) => {
    try {
        const formuleMateriels = await FormuleMateriel.find({}, '_id');
        const ids = formuleMateriels.map(formuleMateriel => formuleMateriel._id.toString());
        res.json(ids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Créer une formule de matériel
router.post('/', async (req, res) => {
    try {
        const formuleMateriel = new FormuleMateriel(req.body);
        await formuleMateriel.save();
        res.status(201).json(formuleMateriel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lire toutes les formules de matériel
router.get('/', async (req, res) => {
    try {
        // const formulesMateriel = await FormuleMateriel.find();
        // res.json(formulesMateriel);
        const result = await FormuleMateriel.aggregate([
            {
                $lookup: {
                    from: 'services',
                    localField: 'idservice',
                    foreignField: '_id',
                    as: 'service'
                }
            },
            {
                $unwind: '$service'
            },
            {
                $lookup: {
                    from: 'materiels',
                    localField: 'idmateriel',
                    foreignField: '_id',
                    as: 'materiel'
                }
            },
            {
                $unwind: '$materiel'
            },
            {
                $project: {
                    'service.nom': 1,
                    'service._id': 1,
                    'materiel.nom': 1,
                    'materiel._id': 1,
                    'quantite': 1
                }
            }
        ]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lire une formule de matériel
router.get('/:id', async (req, res) => {
    try {
        const formuleMateriel = await FormuleMateriel.findById(req.params.id);
        res.json(formuleMateriel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mettre à jour une formule de matériel
router.put('/:id', async (req, res) => {
    try {
        const formuleMateriel = await FormuleMateriel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(formuleMateriel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer une formule de matériel
router.delete('/:id', async (req, res) => {
    try {
        await FormuleMateriel.findByIdAndDelete(req.params.id);
        res.json({ message: "Formule de matériel supprimée" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;