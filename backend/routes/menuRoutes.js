const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/',(req, res) => {
  const role = req.user.role;
  const menusPath = path.join(__dirname, '../config/menus.json');

  fs.readFile(menusPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la lecture des menus' });
    }

    const menus = JSON.parse(data);
    const menu = menus[role];
    res.json(menu);
  });
});

module.exports = router;