const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors');
const cookieParser = require("cookie-parser");
require('dotenv').config();

const app = express(); 
const PORT = process.env.PORT || 5000; 

// Middleware 
app.use((req, res, next) => {
    if (req.path === '/login') {
        cors()(req, res, next);
    } else {
        cors({ origin: process.env.FRONTEND_URL, credentials: true })(req, res, next);
    }
});
app.use(express.json());
app.use(cookieParser());

// Connexion à MongoDB 
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log("MongoDB connecté")) 
  .catch(err => console.log(err)); 

 // Routes
// app.use('/articles', require('./routes/articleRoutes'));
app.use('/unites', require('./routes/uniteRoutes'));
app.use('/roles', require('./routes/roleRoutes'));
app.use('/employes', require('./routes/employeRoutes'));
app.use('/postes', require('./routes/posteRoutes'));
app.use('/salaires', require('./routes/salaireRoutes'));
app.use('/materiels', require('./routes/materielRoutes'));
app.use('/stocks', require('./routes/stockRoutes'));
app.use('/services', require('./routes/serviceRoutes'));
app.use('/formulesMateriel', require('./routes/formuleMaterielRoutes'));
app.use('/formulesPoste', require('./routes/formulePosteRoutes'));
app.use('/clients', require('./routes/clientRoutes'));
app.use('/factures', require('./routes/factureRoutes'));
app.use('/detailsFacture', require('./routes/detailFactureRoutes'));

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`)); 