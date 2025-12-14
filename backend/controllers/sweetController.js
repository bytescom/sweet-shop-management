import Sweet from "../models/sweetSchema.js";

// create sweet (admin only)
export const createSweet = async (req, res) => {
    try {
        const { name, category, price, quantity } = req.body;

        const sweet = await Sweet.create({
            name,
            category,
            price,
            quantity,
        });

        res.status(201).json(sweet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// get all sweets
export const getAllSweets = async (req, res) => {
    try {
        const sweets = await Sweet.find();
        res.status(200).json(sweets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// search sweets
export const searchSweets = async (req, res) => {
    try {
        const { name, category, minPrice, maxPrice } = req.query;

        const query = {};

        if (name) query.name = new RegExp(name, "i");
        if (category) query.category = category;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = minPrice;
            if (maxPrice) query.price.$lte = maxPrice;
        }

        const sweets = await Sweet.find(query);
        res.status(200).json(sweets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// update sweet (admin only)
export const updateSweet = async (req, res) => {
    try {
        const sweet = await Sweet.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!sweet) {
            return res.status(404).json({ message: "Sweet not found" });
        }

        res.status(200).json(sweet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// delete sweet (admin only)
export const deleteSweet = async (req, res) => {
    try {
        const sweet = await Sweet.findByIdAndDelete(req.params.id);

        if (!sweet) {
            return res.status(404).json({ message: "Sweet not found" });
        }

        res.status(200).json({ message: "Sweet deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};