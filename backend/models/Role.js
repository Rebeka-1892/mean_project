const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
	nom: { type: String, required: true },
	idrole: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: false }
}, { timestamps: true });

module.exports = mongoose.model('Role', RoleSchema);