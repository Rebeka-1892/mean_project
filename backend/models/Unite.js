const mongoose = require('mongoose');

const UniteSchema = new mongoose.Schema({
	nom: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Unite', UniteSchema);