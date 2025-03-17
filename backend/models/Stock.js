const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    idmateriel: { type: mongoose.Schema.Types.ObjectId, ref: 'Materiel', required: true },
    date: { type: Date, required: true },
    entree: { type: Number, required: true },
    sortie: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Stock', StockSchema);