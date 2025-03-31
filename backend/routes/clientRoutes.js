require('dotenv').config();
const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const jwt = require('jsonwebtoken');

// Récupérer tous les IDs
router.get('/ids', async (req, res) => {
	try {
		const clients = await Client.find({}, '_id');
		const ids = clients.map(client => client._id.toString());
		res.json(ids);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// se connecter
router.post('/login', async (req, res) => {
	try {
		const {nom, motdepasse} = req.body;

		const client = await Client.findOne({nom});
		if (!client) return res.status(400).json({message: 'Utilisateur non trouvé'});

		const estValide = await client.verifierMotDePasse(motdepasse);
		if (!estValide) return res.status(400).json({message: 'Mot de passe incorrect'});

		const role = "client";
		const token = jwt.sign({id: client._id, role: role}, process.env.JWT_SECRET, {expiresIn: '1h'});

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

// s'inscrire
router.post('/register', async (req, res) => {
	try {
		const client = new Client(req.body);
		await client.save();
		res.status(201).json(client);
	} catch (error) {
		res.status(400).json({message: error.message});
	}
});

router.get('/', async (req, res) => {
	try {
		const clients = await Client.find();
		res.json(clients);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
});

router.get('/:id', async (req, res) => {
	try {
		const client = await Client.findById(req.params.id);
		res.json(client);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
});

router.put('/:id', async (req, res) => {
	try {
		const client = await Client.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.json(client);
	} catch (error) {
		res.status(400).json({message: error.message});
	}
});

router.delete('/:id', async (req, res) => {
	try {
		await Client.findByIdAndDelete(req.params.id);
		res.json({message: "Client supprimé"});
	} catch (error) {
		res.status(500).json({message: error.message});
	}
});

module.exports = router;