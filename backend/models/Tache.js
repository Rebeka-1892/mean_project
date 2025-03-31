const mongoose = require('mongoose');

const TacheSchema = new mongoose.Schema({
    idfacture: { type: mongoose.Schema.Types.ObjectId, ref: 'Facture', required: true },
    idrole: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    idemploye: { type: mongoose.Schema.Types.ObjectId, ref: 'Employe', required: true },
    statut: { type: Number, required: true },
    heure: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Tache', TacheSchema);