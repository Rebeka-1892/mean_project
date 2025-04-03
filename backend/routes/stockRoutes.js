const express = require("express");
const router = express.Router();
const Stock = require("../models/Stock");

// Récupérer tous les IDs
router.get("/ids", async (req, res) => {
  try {
    const stocks = await Stock.find({}, "_id");
    const ids = stocks.map((stock) => stock._id.toString());
    res.json(ids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Créer un stock
router.post("/", async (req, res) => {
  try {
    const stock = new Stock(req.body);
    await stock.save();
    res.status(201).json(stock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Lire tous les stocks
router.get("/", async (req, res) => {
  try {
    // const stocks = await Stock.find().populate('idmateriel');
    // res.json(stocks);
    const stocks = await Stock.aggregate([
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, // Formatage en AAAA-MM-JJ
            idmateriel: "$idmateriel",
          },
          totalEntree: { $sum: "$entree" },
          totalSortie: { $sum: "$sortie" },
        },
      },
      {
        $lookup: {
          from: "materiels", // Assure-toi que le nom est correct dans ta DB
          localField: "_id.idmateriel",
          foreignField: "_id",
          as: "materiel",
        },
      },
      {
        $unwind: "$materiel",
      },
      {
        $project: {
          _id: 0,
          date: "$_id.date",
          idmateriel: "$_id.idmateriel",
          nomMateriel: "$materiel.nom", // Si ton modèle a un champ "nom"
          totalEntree: 1,
          totalSortie: 1,
        },
      },
      {
        $sort: { date: 1 }, // Tri par date croissante
      },
    ]);

    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/etat", async (req, res) => {
  try {
    const stocks = await Stock.aggregate([
      {
        $group: {
          _id: "$idmateriel",
          totalEntree: { $sum: "$entree" },
          totalSortie: { $sum: "$sortie" },
          reste: { $sum: { $subtract: ["$entree", "$sortie"] } },
        },
      },
      {
        $lookup: {
          from: "materiels", // Assure-toi que le nom est correct dans ta DB
          localField: "_id",
          foreignField: "_id",
          as: "materiel",
        },
      },
      {
        $unwind: "$materiel",
      },
      {
        $project: {
          _id: 0,
          idmateriel: "$_id",
          nomMateriel: "$materiel.nom", // Adapte si ton modèle a un autre champ
          totalEntree: 1,
          totalSortie: 1,
          reste: 1,
        },
      },
    ]);

    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lire un stock
router.get("/:id", async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mettre à jour un stock
router.put("/:id", async (req, res) => {
  try {
    const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(stock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Supprimer un stock
router.delete("/:id", async (req, res) => {
  try {
    await Stock.findByIdAndDelete(req.params.id);
    res.json({ message: "Stock supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
