const mongoose = require('mongoose');

const DetailFactureSchema = new mongoose.Schema({
    idfacture: { type: mongoose.Schema.Types.ObjectId, ref: 'Facture', required: true },
    montant: { type: Number, required: true },
    date: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('DetailFacture', DetailFactureSchema);