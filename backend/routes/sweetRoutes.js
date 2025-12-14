import express from "express";
import Protect from "../middleware/authProtect.js";
import adminOnly from "../middleware/adminValidate.js";
import {createSweet, getAllSweets, searchSweets, updateSweet, deleteSweet} from "../controllers/sweetController.js";
import {purchaseSweet, restockSweet} from "../controllers/inventoryController.js";

const router = express.Router();

// user only
router.get("/sweets", Protect, getAllSweets);
router.get("/sweets/search", Protect, searchSweets);
router.post("/sweets/:id/purchase", Protect, purchaseSweet);

// admin only
router.post("/sweets", Protect, adminOnly, createSweet);
router.put("/sweets/:id", Protect, adminOnly, updateSweet);
router.delete("/sweets/:id", Protect, adminOnly, deleteSweet);
router.post("/sweets/:id/restock", Protect, adminOnly, restockSweet);

export default router;
