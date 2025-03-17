const mongoose = require('mongoose');

const FormulePosteSchema = new mongoose.Schema({
    idservice: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    idposte: { type: mongoose.Schema.Types.ObjectId, ref: 'Poste', required: true },
    quantite: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('FormulePoste', FormulePosteSchema);