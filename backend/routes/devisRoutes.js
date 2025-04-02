const express = require("express");
const router = express.Router();
const Devis = require("../models/Devis");
const DetailDevis = require("../models/DetailDevis");

// Récupérer tous les IDs
router.get("/ids", async (req, res) => {
  try {
    const devis = await Devis.find({}, "_id");
    const ids = devis.map((item) => item._id.toString());
    res.json(ids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const devis = new Devis(req.body);
    await devis.save();
    res.status(201).json(devis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    // const devis = await Devis.find();
    // res.json(devis);
    const result = await Devis.aggregate([
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
          from: "demandes",
          localField: "iddemande",
          foreignField: "_id",
          as: "demande",
        },
      },
      {
        $unwind: "$demande",
      },
      {
        $project: {
          "client.nom": 1,
          "client._id": 1,
          date: 1,
          "demande.description": 1,
          "demande.date": 1,
          "demande._id": 1,
        },
      },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/idclient/:id", async (req, res) => {
  try {
    const devis = await Devis.find({ idclient: req.params.id }).populate(
      "iddemande"
    );
    const devisIds = devis.map((d) => d._id);

    const detailDevisList = await DetailDevis.aggregate([
      { $match: { iddevis: { $in: devisIds } } }, // Filtrer par les devis récupérés
      {
        $lookup: {
          from: "services",
          localField: "idservice",
          foreignField: "_id",
          as: "service",
        },
      },
      {
        $unwind: "$service",
      },
      {
        $project: {
          iddevis: 1,
          "service.nom": 1,
          "service._id": 1,
        },
      },
    ]);

    const result = devis.map((d) => {
      d = d.toObject(); // Convertir Mongoose Document en objet JS
      d.detailDevis = detailDevisList.filter((dd) => dd.iddevis.equals(d._id)); // Associer les détails
      return d;
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const devis = await Devis.findById(req.params.id);
    res.json(devis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const devis = await Devis.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(devis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/devis/:id", async (req, res) => {
  try {
    const { statut } = req.body;
    const updatedDevis = await Devis.findByIdAndUpdate(
      req.params.id,
      { statut },
      { new: true }
    );
    res.json(updatedDevis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Devis.findByIdAndDelete(req.params.id);
    res.json({ message: "Devis supprimée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
