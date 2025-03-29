const mongoose = require('mongoose');

const DemandeSchema = new mongoose.Schema({
    idclient: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Demande', DemandeSchema);