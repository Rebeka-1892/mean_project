const mongoose = require('mongoose');

const DevisSchema = new mongoose.Schema({
    idclient: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    iddemande: { type: mongoose.Schema.Types.ObjectId, ref: 'Demande', required: true },
    date: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Devis', DevisSchema);