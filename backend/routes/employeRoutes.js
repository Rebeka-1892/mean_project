require('dotenv').config();
const express = require('express');
const router = express.Router();
const Employe = require('../models/Employe');
const jwt = require('jsonwebtoken');

const Role = require('../models/Role');
const Facture = require("../models/Facture");
const Devis = require("../models/Devis");
const DetailDevis = require("../models/DetailDevis");
const FormuleRole = require("../models/FormuleRole");
const Poste = require("../models/Poste");

// Récupérer tous les IDs
router.get('/ids', async (req, res) => {
	try {
		const employes = await Employe.find({}, '_id');
		const ids = employes.map(employes => employes._id.toString());
		res.json(ids);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// se connecter
router.post('/login', async (req, res) => {
	try {
		const {nom, motdepasse} = req.body;

		const employe = await Employe.findOne({nom});
		if (!employe) return res.status(400).json({message: 'Utilisateur non trouvé'});

		const estValide = await employe.verifierMotDePasse(motdepasse);
		if (!estValide) return res.status(400).json({message: 'Mot de passe incorrect'});

		const role = await Role.findById(employe.idrole);
		const token = jwt.sign({id: employe._id, role: role.nom}, process.env.JWT_SECRET, {expiresIn: '1h'});

		res.cookie('token', token, {httpOnly: false, secure: true, sameSite: 'strict', maxAge: 3600000});
		res.status(200).end();
	} catch (error) {
		res.status(400).json({message: error.message});
	}
});

// Déconnexion
router.get('/logout', (req, res) => {
	try {
		res.clearCookie('token', {httpOnly: false, secure: true});
		res.status(200).end();
	} catch (error) {
		res.status(400).json({message: error.message});
	}
});

// Créer un employé
router.post('/register', async (req, res) => {
	try {
		const employe = new Employe(req.body);
		await employe.save();
		res.status(201).json(employe);
	} catch (error) {
		res.status(400).json({message: error.message});
	}
});

// Lire tous les employés
router.get('/', async (req, res) => {
	try {
		const employes = await Employe.find().populate('idrole');
		res.json(employes);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
});

// nombre employe
router.get('/nombre', async (req, res) => {
	try {
		const employes = await Employe.countDocuments();
		res.json(employes);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
});

// Lire un employé
router.get('/:id', async (req, res) => {
	try {
		const employe = await Employe.findById(req.params.id);
		res.json(employe);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
});

// Mettre à jour un employé
router.put('/:id', async (req, res) => {
	try {
		const employe = await Employe.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.json(employe);
	} catch (error) {
		res.status(400).json({message: error.message});
	}
});

// Supprimer un employé
router.delete('/:id', async (req, res) => {
	try {
		await Employe.findByIdAndDelete(req.params.id);
		res.json({message: "Employé supprimé"});
	} catch (error) {
		res.status(500).json({message: error.message});
	}
});

// Avoir les employés par facture et par rôle
router.get('/facture/:idfacture/role/:idrole', async (req, res) => {
	try {
		const { idfacture, idrole } = req.params;

		const facture = await Facture.findById(idfacture);
		if (!facture) {
			return res.status(404).json({ message: 'Facture non trouvée' });
		}

		const devis = await Devis.findById(facture.iddevis);
		if (!devis) {
			return res.status(404).json({ message: 'Devis non trouvé' });
		}

		const detailDevis = await DetailDevis.find({ iddevis: devis._id });
		const serviceIds = detailDevis.map(detail => detail.idservice);

		const formuleRoles = await FormuleRole.find({ idservice: { $in: serviceIds }, idrole: idrole });
		const roleIds = formuleRoles.map(formule => formule.idrole);

		const postes = await Poste.find({ idrole: { $in: roleIds } });
		const employeIds = postes.map(poste => poste.idemploye);

		const employes = await Employe.find({ _id: { $in: employeIds } });

		res.json(employes);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;