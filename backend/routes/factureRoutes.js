const express = require("express");
const router = express.Router();
const Facture = require("../models/Facture");
const Tache = require("../models/Tache");

// Récupérer tous les IDs
router.get("/ids", async (req, res) => {
  try {
    const factures = await Facture.find({}, "_id");
    const ids = factures.map((facture) => facture._id.toString());
    res.json(ids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

router.get("/montant-total", async (req, res) => {
  try {
    const totalMontant = await Facture.aggregate([
      {
        $group: {
          _id: null, // Pas besoin de groupement par champ spécifique
          total: { $sum: "$montant" }, // Somme de tous les montants
          benefice: { $sum: "$benefice" } 
        }
      }
    ]);

    res.json({ 
      total: totalMontant.length > 0 ? totalMontant[0].total : 0, 
      benefice : totalMontant.length > 0 ? totalMontant[0].benefice : 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// montant par mois
router.get("/montant-par-mois", async (req, res) => {
  try {
    const result = await Facture.aggregate([
      {
        $group: {
          _id: { 
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          totalMontant: { $sum: "$montant" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 } // Trier par année et mois croissant
      }
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/facture_sans_taches", async (req, res) => {
  try {
    const factures = await Facture.aggregate([
      {
        $lookup: {
          from: "taches",
          localField: "_id",
          foreignField: "idfacture",
          as: "taches",
        },
      },
      {
        $match: { taches: { $size: 0 } }, // Filtrer les factures sans tâches
      },
    ]);
    res.json(factures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/idclient/:id", async (req, res) => {
  try {
    const factures = await Facture.find({ idclient: req.params.id }).populate('iddevis');
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
      },
      {
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
          heure: 1,
          "employe.nom": 1,
          "employe._id": 1,
          "role.nom": 1,
          "role._id": 1,
        },
      },
    ]);

    const result = factures.map((d) => {
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
