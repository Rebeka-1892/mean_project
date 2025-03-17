const mongoose = require('mongoose');

const MaterielSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prix: { type: Number, required: true },
	idunite: { type: mongoose.Schema.Types.ObjectId, ref: 'Unite', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Materiel', MaterielSchema);