const mongoose = require('mongoose');

const EmployeSchema = new mongoose.Schema({
	nom: { type: String, required: true },
	salaire: { type: Number, required: true },
	idRole: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Employe', EmployeSchema);