const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    marge: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);