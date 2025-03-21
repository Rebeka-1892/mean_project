const mongoose = require('mongoose');

const FormuleMaterielSchema = new mongoose.Schema({
    idservice: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    idmateriel: { type: mongoose.Schema.Types.ObjectId, ref: 'Materiel', required: true },
    quantite: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('FormuleMateriel', FormuleMaterielSchema);