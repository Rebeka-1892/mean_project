const mongoose = require('mongoose');

const FactureSchema = new mongoose.Schema({
    iddevis: { type: mongoose.Schema.Types.ObjectId, ref: 'Devis', required: true },
    idclient: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    montant: { type: Number, required: true },
    benefice: { type: Number, required: true },
    date: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Facture', FactureSchema);