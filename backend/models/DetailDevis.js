const mongoose = require('mongoose');

const DetailDevisSchema = new mongoose.Schema({
    iddevis: { type: mongoose.Schema.Types.ObjectId, ref: 'Devis', required: true },
    idservice: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }
}, { timestamps: true });

module.exports = mongoose.model('DetailDevis', DetailDevisSchema);