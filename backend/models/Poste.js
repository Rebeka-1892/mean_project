const mongoose = require('mongoose');

const PosteSchema = new mongoose.Schema({
	idEmploye: { type: mongoose.Schema.Types.ObjectId, ref: 'Employe', required: true },
	idRole: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Poste', PosteSchema);