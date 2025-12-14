import Sweet from "../models/sweetSchema.js";

// purchase sweet
export const purchaseSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  if (sweet.quantity <= 0) {
    return res.status(400).json({ message: "Out of stock" });
  }

  sweet.quantity -= 1;
  await sweet.save();

  res.status(200).json({
    message: "Purchase successful",
    quantity: sweet.quantity
  });
};

// restock sweet (admin only)
export const restockSweet = async (req, res) => {
  const { amount } = req.body;

  const sweet = await Sweet.findById(req.params.id);
  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  sweet.quantity += Number(amount);
  await sweet.save();

  res.status(200).json({
    message: "Restocked successfully",
    quantity: sweet.quantity
  });
};
