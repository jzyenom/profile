// controllers/menuController.js
import MenuItem from "../models/menu.model.js";

// GET /api/menus/:restaurantId
export const getAllMenuItems = async (req, res) => {
  const item = await MenuItem.find({});
  res.json(item);
};

// GET /api/menus/:restaurantId
export const getMenuByRestaurant = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return next(404, "Item not found");
    }
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

// GET /api/menus/item/:id
export const getMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return next(404, "Item not found");
    }
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

// POST /api/menus
export const createMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);
    return res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

// PUT /api/menus/:id
export const updateMenuItem = async (req, res, next) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) {
    return next();
  }
  if (req.user.id !== item.owner) {
    return next();
  }
  try {
    const updateditem = await MenuItem.findByIdAndUpdate(
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
export const deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    if (req.user.id !== item.owner) {
      return res
        .status(401)
        .json({ message: "You are not authorized to delete this item!" });
    }

    await MenuItem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// POST /api/menu/validate-cart
// Validate cart items server-side
// export const ValidateMenuForOrder = async (req, res, next) => {
//   try {
//     const { itemIds } = req.body;
//     if (!Array.isArray(itemIds) || itemIds.length === 0) {
//       return res.status(400).json({ message: "No item IDs provided" });
//     }

//     const items = await MenuItem.find({ _id: { $in: itemIds } });

//     res.status(200).json(items);
//   } catch (err) {
//     next(err);
//   }
// };

//Enhance it to return both validItems and invalidItemIds:
export const ValidateMenuForOrder = async (req, res, next) => {
  try {
    const { itemIds } = req.body;

    if (!Array.isArray(itemIds) || itemIds.length === 0) {
      return res.status(400).json({ message: "No item IDs provided" });
    }

    const items = await MenuItem.find({ _id: { $in: itemIds } });

    const foundIds = items.map((item) => item._id.toString());
    const invalidItemIds = itemIds.filter((id) => !foundIds.includes(id));

    res.status(200).json({
      validItems: items,
      invalidItemIds,
    });
  } catch (err) {
    next(err);
  }
};
