const mongoose = require('mongoose');

const FormuleRoleSchema = new mongoose.Schema({
    idservice: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    idrole: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    nombre: { type: Number, required: true },
    heure: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('FormuleRole', FormuleRoleSchema);