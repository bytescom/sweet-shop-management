"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function SweetModal({ isOpen, onClose, onSubmit, sweet = null, isRestock = false }) {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        quantity: ""
    });

    useEffect(() => {
        if (sweet) {
            setFormData({
                name: sweet.name,
                category: sweet.category,
                price: sweet.price,
                quantity: isRestock ? "" : sweet.quantity // If restocking, we want empty field for amount
            });
        } else {
            setFormData({ name: "", category: "", price: "", quantity: "" });
        }
    }, [sweet, isRestock, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-[#111] border border-border rounded-2xl shadow-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">
                        {isRestock ? "Restock Inventory" : sweet ? "Edit Sweet" : "Add New Sweet"}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {!isRestock && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 bg-black border border-border rounded-lg focus:border-primary focus:outline-none text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2 bg-black border border-border rounded-lg focus:border-primary focus:outline-none text-white appearance-none"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Milk">Milk</option>
                                    <option value="Dry">Dry</option>
                                    <option value="Ghee">Ghee</option>
                                    <option value="Syrup">Syrup</option>
                                    <option value="Fried">Fried</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Price (₹)</label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full px-4 py-2 bg-black border border-border rounded-lg focus:border-primary focus:outline-none text-white"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                            {isRestock ? "Quantity to Add" : "Initial Quantity"}
                        </label>
                        <input
                            type="number"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                            className="w-full px-4 py-2 bg-black border border-border rounded-lg focus:border-primary focus:outline-none text-white"
                            required
                            min="1"
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2.5 bg-primary hover:bg-primary-hover text-black font-bold rounded-lg transition-colors"
                        >
                            {isRestock ? "Restock" : sweet ? "Update Changes" : "Create Sweet"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
