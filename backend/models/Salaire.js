const mongoose = require('mongoose');

const SalaireSchema = new mongoose.Schema({
    idEmploye: { type: mongoose.Schema.Types.ObjectId, ref: 'Employe', required: true },
    montant: { type: Number, required: true },
    date: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Salaire', SalaireSchema);