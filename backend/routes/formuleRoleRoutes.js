const express = require('express');
const router = express.Router();
const FormuleRole = require('../models/FormuleRole');

// Récupérer tous les IDs
router.get('/ids', async (req, res) => {
    try {
        const formuleRoles = await FormuleRole.find({}, '_id');
        const ids = formuleRoles.map(formuleRole => formuleRole._id.toString());
        res.json(ids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Créer une formule de poste
router.post('/', async (req, res) => {
    try {
        const formuleRole = new FormuleRole(req.body);
        await formuleRole.save();
        res.status(201).json(formuleRole);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lire toutes les formules de poste
router.get('/', async (req, res) => {
    try {
        // const formulesPoste = await FormuleRole.find();
        // res.json(formulesPoste);
        const result = await FormuleRole.aggregate([
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
                    from: 'roles',
                    localField: 'idrole',
                    foreignField: '_id',
                    as: 'role'
                }
            },
            {
                $unwind: '$role'
            },
            {
                $project: {
                    'service.nom': 1,
                    'service._id': 1,
                    'role.nom': 1,
                    'role._id': 1,
                    'nombre': 1,
                    'heure': 1
                }
            }
        ]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lire une formule de poste
router.get('/:id', async (req, res) => {
    try {
        const formuleRole = await FormuleRole.findById(req.params.id);
        res.json(formuleRole);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mettre à jour une formule de poste
router.put('/:id', async (req, res) => {
    try {
        const formuleRole = await FormuleRole.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(formuleRole);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer une formule de poste
router.delete('/:id', async (req, res) => {
    try {
        await FormuleRole.findByIdAndDelete(req.params.id);
        res.json({ message: "Formule de poste supprimée" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;