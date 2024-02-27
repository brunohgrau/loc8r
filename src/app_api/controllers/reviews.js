const mongoose = require("mongoose");
const Loc = mongoose.model("Location");

const reviewsCreate = async (req, res) => {
  try {
    const locationId = req.params.locationid;

    if (locationId) {
      const location = await Loc.findById(locationId).select("reviews");

      await doAddReview(req, res, location);
    } else {
      res.status(404).json({ message: "Location not found" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
const doAddReview = async (req, res, location) => {
  try {
    if (!location) {
      res.status(404).json({ message: "Location not found" });
      return; // Exit the function early if location not found
    }

    const { author, rating, reviewText } = req.body;

    location.reviews.push({ author, rating, reviewText });

    await location.save();

    await updateAverageRating(location._id);

    const thisReview = location.reviews.slice(-1).pop();

    res.status(201).json(thisReview);
  } catch (err) {
    res.status(400).json(err);
  }
};

const reviewsReadOne = (req, res) => {};
const reviewsUpdateOne = (req, res) => {};
const reviewsDeleteOne = (req, res) => {};

module.exports = {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne,
};
