const express = require("express");
const router = express.Router();
const Demande = require("../models/Demande");

// Récupérer tous les IDs
router.get('/ids', async (req, res) => {
  try {
    const demandes = await Demande.find({}, '_id');
    const ids = demandes.map(demande => demande._id.toString());
    res.json(ids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const demande = new Demande(req.body);
    await demande.save();
    res.status(201).json(demande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// demandes sans devis
router.get("/", async (req, res) => {
  try {
    const result = await Demande.aggregate([
      {
        $lookup: {
          from: "clients",
          localField: "idclient",
          foreignField: "_id",
          as: "client",
        },
      },
      {
        $unwind: "$client",
      },
      {
        $lookup: {
          from: "devis",
          localField: "_id",
          foreignField: "iddemande",
          as: "devisAssocie",
        },
      },
      // Filtrer pour ne garder que les demandes qui n'ont pas encore de devis
      {
        $match: { devisAssocie: { $size: 0 } },
      },
      {
        $project: {
          "client.nom": 1,
          "client._id": 1,
          "description": 1,
          "date": 1,
        },
      },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const demande = await Demande.findById(req.params.id);
    res.json(demande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const demande = await Demande.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(demande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Demande.findByIdAndDelete(req.params.id);
    res.json({ message: "Demande supprimée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
