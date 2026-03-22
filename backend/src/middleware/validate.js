const validateCaterer = (req, res, next) => {
  const { name, location, pricePerPlate, cuisines, rating } = req.body;
  const errors = [];

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("name is required and must be at least 2 characters.");
  }

  if (!location || typeof location !== "string" || location.trim().length < 2) {
    errors.push("location is required and must be at least 2 characters.");
  }

  if (pricePerPlate === undefined || pricePerPlate === null) {
    errors.push("pricePerPlate is required.");
  } else if (typeof pricePerPlate !== "number" || pricePerPlate <= 0 || !Number.isFinite(pricePerPlate)) {
    errors.push("pricePerPlate must be a positive number.");
  }

  if (!cuisines || !Array.isArray(cuisines) || cuisines.length === 0) {
    errors.push("cuisines must be a non-empty array.");
  } else {
    const allStrings = cuisines.every((c) => typeof c === "string" && c.trim().length > 0);
    if (!allStrings) {
      errors.push("Each item in cuisines must be a non-empty string.");
    }
  }

  if (rating === undefined || rating === null) {
    errors.push("rating is required.");
  } else if (typeof rating !== "number" || rating < 0 || rating > 5 || !Number.isFinite(rating)) {
    errors.push("rating must be a number between 0 and 5.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};

module.exports = { validateCaterer };
