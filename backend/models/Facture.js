const mongoose = require('mongoose');

const FactureSchema = new mongoose.Schema({
    idclient: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    montant: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Facture', FactureSchema);