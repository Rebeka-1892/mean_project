const express = require("express");
const router = express.Router();
const Facture = require("../models/Facture");
const Tache = require("../models/Tache");

// Créer une facture
router.post("/", async (req, res) => {
  try {
    const facture = new Facture(req.body);
    await facture.save();
    res.status(201).json(facture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Lire toutes les factures
router.get("/", async (req, res) => {
  try {
    const factures = await Facture.find();
    res.json(factures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/idclient/:id", async (req, res) => {
  try {
    const factures = await Facture.find({ idclient: req.params.id })();
    const factureIds = factures.map((d) => d._id);

    const tacheList = await Tache.aggregate([
      { $match: { idfacture: { $in: factureIds } } }, 
      {
        $lookup: {
          from: "employes",
          localField: "idemploye",
          foreignField: "_id",
          as: "employe",
        },
      },
      {
        $unwind: "$employe",
      },{
        $lookup: {
          from: "roles",
          localField: "idrole",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $unwind: "$role",
      },
      {
        $project: {
          idfacture: 1,
          statut: 1,
          heure : 1,
          "employe.nom": 1,
          "employe._id": 1,
          "role.nom": 1,
          "role._id": 1,
        },
      },
    ]);

    const result = devis.map((d) => {
      d = d.toObject(); // Convertir Mongoose Document en objet JS
      d.tache = tacheList.filter((dd) => dd.idfacture.equals(d._id)); // Associer les détails
      return d;
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const facture = await Facture.findById(req.params.id);
    res.json(facture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mettre à jour une facture
router.put("/:id", async (req, res) => {
  try {
    const facture = await Facture.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(facture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Supprimer une facture
router.delete("/:id", async (req, res) => {
  try {
    await Facture.findByIdAndDelete(req.params.id);
    res.json({ message: "Facture supprimée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
