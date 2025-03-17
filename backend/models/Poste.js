const mongoose = require('mongoose');

const PosteSchema = new mongoose.Schema({
	idemploye: { type: mongoose.Schema.Types.ObjectId, ref: 'Employe', required: true },
	idrole: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Poste', PosteSchema);