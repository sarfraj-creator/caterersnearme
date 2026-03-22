const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { readData, writeData } = require("../utils/dataStore");
const { validateCaterer } = require("../middleware/validate");

const router = express.Router();

// GET /api/caterers
// Supports optional query params: search, minPrice, maxPrice, cuisine, sortBy, order
router.get("/", (req, res) => {
  try {
    let caterers = readData();
    const { search, minPrice, maxPrice, cuisine, sortBy, order } = req.query;

    if (search && search.trim()) {
      const keyword = search.trim().toLowerCase();
      caterers = caterers.filter((c) => c.name.toLowerCase().includes(keyword));
    }

    if (minPrice !== undefined) {
      const min = parseFloat(minPrice);
      if (isNaN(min)) return res.status(400).json({ success: false, message: "minPrice must be a valid number." });
      caterers = caterers.filter((c) => c.pricePerPlate >= min);
    }

    if (maxPrice !== undefined) {
      const max = parseFloat(maxPrice);
      if (isNaN(max)) return res.status(400).json({ success: false, message: "maxPrice must be a valid number." });
      caterers = caterers.filter((c) => c.pricePerPlate <= max);
    }

    if (cuisine && cuisine.trim()) {
      const target = cuisine.trim().toLowerCase();
      caterers = caterers.filter((c) =>
        c.cuisines.some((cu) => cu.toLowerCase().includes(target))
      );
    }

    const allowedSortFields = ["pricePerPlate", "rating", "name"];
    if (sortBy && allowedSortFields.includes(sortBy)) {
      const dir = order === "desc" ? -1 : 1;
      caterers = caterers.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1 * dir;
        if (a[sortBy] > b[sortBy]) return 1 * dir;
        return 0;
      });
    }

    res.json({ success: true, total: caterers.length, data: caterers });
  } catch (err) {
    console.error("GET /api/caterers error:", err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// GET /api/caterers/:id
router.get("/:id", (req, res) => {
  try {
    const caterers = readData();
    const caterer = caterers.find((c) => c.id === req.params.id);

    if (!caterer) {
      return res.status(404).json({ success: false, message: "Caterer not found." });
    }

    res.json({ success: true, data: caterer });
  } catch (err) {
    console.error("GET /api/caterers/:id error:", err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// POST /api/caterers
router.post("/", validateCaterer, (req, res) => {
  try {
    const { name, location, pricePerPlate, cuisines, rating } = req.body;
    const caterers = readData();

    // Check for duplicate name + location combo
    const duplicate = caterers.find(
      (c) =>
        c.name.toLowerCase() === name.trim().toLowerCase() &&
        c.location.toLowerCase() === location.trim().toLowerCase()
    );
    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "A caterer with this name already exists in that location.",
      });
    }

    const newCaterer = {
      id: uuidv4(),
      name: name.trim(),
      location: location.trim(),
      pricePerPlate: parseFloat(pricePerPlate.toFixed(2)),
      cuisines: cuisines.map((c) => c.trim()),
      rating: parseFloat(rating.toFixed(1)),
    };

    caterers.push(newCaterer);
    writeData(caterers);

    res.status(201).json({ success: true, data: newCaterer });
  } catch (err) {
    console.error("POST /api/caterers error:", err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

module.exports = router;
