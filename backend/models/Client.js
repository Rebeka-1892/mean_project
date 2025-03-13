const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    nom: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Client', ClientSchema);