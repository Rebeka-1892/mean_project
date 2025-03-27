require('dotenv').config();
const express = require('express');
const router = express.Router();
const Employe = require('../models/Employe');
const jwt = require('jsonwebtoken');

const Role = require('../models/Role');

// se connecter
router.post('/login', async (req, res) => {
    try {
        const { nom, motdepasse } = req.body;

        const employe = await Employe.findOne({ nom });
        if (!employe) return res.status(400).json({ message: 'Utilisateur non trouvé' });

        const estValide = await employe.verifierMotDePasse(motdepasse);
        if (!estValide) return res.status(400).json({ message: 'Mot de passe incorrect' });

		const role = await Role.findById(employe.idrole);
		const token = jwt.sign({ id: employe._id, role: role.nom }, process.env.JWT_SECRET, { expiresIn: '1h' });

		res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 });
		// res.json({ token });
		res.status(200).json({ message: 'Connexion réussie' });
    } catch (error) {
		res.status(400).json({ message: error.message });
    }
});

// Déconnexion
router.post('/logout', (req, res) => {
	try {
		res.clearCookie('token', { httpOnly: true, secure: true });
		res.status(200).json({ message: 'Déconnexion réussie' });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Créer un employé
router.post('/register', async (req, res) => {
    try {
		const employe = new Employe(req.body);
		await employe.save();
		res.status(201).json(employe);
    } catch (error) {
		res.status(400).json({ message: error.message });
    }
});

// Lire tous les employés
router.get('/', async (req, res) => {
	try {
		const employes = await Employe.find();
		res.json(employes);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Lire un employé
router.get('/:id', async (req, res) => {
	try {
		const employe = await Employe.findById(req.params.id);
		res.json(employe);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Mettre à jour un employé
router.put('/:id', async (req, res) => {
	try {
		const employe = await Employe.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.json(employe);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Supprimer un employé
router.delete('/:id', async (req, res) => {
	try {
		await Employe.findByIdAndDelete(req.params.id);
		res.json({ message: "Employé supprimé" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;