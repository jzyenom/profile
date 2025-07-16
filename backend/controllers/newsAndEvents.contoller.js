import newsAndEvents from "../models/newsAndEvents.model.js";

// GET /api/menus/:item
export const getAllNewsAndEvents = async (req, res) => {
  const item = await newsAndEvents.find({});
  res.json(item);
};

// POST /api/menus
export const createNewsAndEvents = async (req, res) => {
  try {
    const item = await newsAndEvents.create(req.body);
    return res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

// PUT /api/menus/:id
export const updateNewsAndEvents = async (req, res, next) => {
  const item = await newsAndEvents.findById(req.params.id);
  if (!item) {
    return next();
  }
  if (req.user.id !== item.owner) {
    return next();
  }
  try {
    const updateditem = await newsAndEvents.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(updateditem);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/menus/:id
export const deleteNewsAndEvents = async (req, res) => {
  try {
    await newsAndEvents.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
