const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Récupérer tous les IDs
router.get('/ids', async (req, res) => {
    try {
        const services = await Service.find({}, '_id');
        const ids = services.map(service => service._id.toString());
        res.json(ids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Créer un service
router.post('/', async (req, res) => {
    try {
        const service = new Service(req.body);
        await service.save();
        res.status(201).json(service);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lire tous les services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lire un service
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mettre à jour un service
router.put('/:id', async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(service);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer un service
router.delete('/:id', async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: "Service supprimé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;