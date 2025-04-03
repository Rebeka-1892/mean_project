const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const Facture = require("../models/Facture");
const Devis = require("../models/Devis");
const DetailDevis = require("../models/DetailDevis");
const FormuleRole = require("../models/FormuleRole");

// Récupérer tous les IDs
router.get('/ids', async (req, res) => {
	try {
		const roles = await Role.find({}, '_id');
		const ids = roles.map(role => role._id.toString());
		res.json(ids);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Créer un rôle
router.post('/', async (req, res) => {
	try {
		const role = new Role(req.body);
		await role.save();
		res.status(201).json(role);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Lire tous les rôles avec filtres optionnels
router.get('/', async (req, res) => {
	try {
		const filters = {};
		for (const key in req.query) {
			if (req.query.hasOwnProperty(key)) {
				filters[key] = req.query[key];
			}
		}
		const roles = await Role.find(filters).populate('idrole');
		res.json(roles);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Lire un rôle
router.get('/:id', async (req, res) => {
	try {
		const role = await Role.findById(req.params.id);
		res.json(role);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Mettre à jour un rôle
router.put('/:id', async (req, res) => {
	try {
		const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.json(role);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Supprimer un rôle
router.delete('/:id', async (req, res) => {
	try {
		await Role.findByIdAndDelete(req.params.id);
		res.json({ message: "Rôle supprimé" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get('/:id/roles', async (req, res) => {
	try {
		const facture = await Facture.findById(req.params.id);
		if (!facture) {
			return res.status(404).json({ message: 'Facture non trouvée' });
		}

		const devis = await Devis.findById(facture.iddevis);
		if (!devis) {
			return res.status(404).json({ message: 'Devis non trouvé' });
		}

		const detailDevis = await DetailDevis.find({ iddevis: devis._id });
		const serviceIds = detailDevis.map(detail => detail.idservice);

		const formuleRoles = await FormuleRole.find({ idservice: { $in: serviceIds } });
		const roleIds = formuleRoles.map(formule => formule.idrole);

		const roles = await Role.find({ _id: { $in: roleIds } });
		res.json(roles);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;