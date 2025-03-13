const mongoose = require('mongoose');

const FormulePosteSchema = new mongoose.Schema({
    idService: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    idPoste: { type: mongoose.Schema.Types.ObjectId, ref: 'Poste', required: true },
    quantite: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('FormulePoste', FormulePosteSchema);