const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ClientSchema = new mongoose.Schema({
	nom: { type: String, required: true },
    motdepasse: { type: String, required: true },
}, { timestamps: true });

// Hachage du mot de passe avant sauvegarde
ClientSchema.pre('save', async function(next) {
    if (!this.isModified('motdepasse')) return next();
    try {
        const sel = await bcrypt.genSalt(10);
        this.motdepasse = await bcrypt.hash(this.motdepasse, sel);
        next();
    } catch (error) {
        next(error);
    }
});

// Méthode pour comparer un mot de passe avec le hash stocké
ClientSchema.methods.verifierMotDePasse  = async function(motdepasse) {
    return await bcrypt.compare(motdepasse, this.motdepasse);
};

module.exports = mongoose.model('Client', ClientSchema);