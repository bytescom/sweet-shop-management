"use client";

import { ShoppingBag, Edit, Trash2, Package } from "lucide-react";

export default function SweetCard({ sweet, onPurchase, isAdmin, onEdit, onDelete }) {
    const isOutOfStock = sweet.quantity <= 0;

    return (
        <div className="group relative bg-[#1E1E1E] rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(212,175,55,0.3)]">
            {/* Image Placeholder (Gradient) */}
            <div className="h-48 w-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] group-hover:from-[#2a2a2a] group-hover:to-[#332b00] transition-colors flex items-center justify-center">
                <Package className="h-16 w-16 text-white/10 group-hover:text-primary/20 transition-colors" />
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <span className="inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 rounded mb-2">
                            {sweet.category}
                        </span>
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                            {sweet.name}
                        </h3>
                    </div>
                    <span className="text-lg font-bold text-primary">
                        ₹{sweet.price}
                    </span>
                </div>

                <div className="flex items-center gap-2 mb-6">
                    <div className={`h-2 w-2 rounded-full ${isOutOfStock ? 'bg-red-500' : 'bg-green-500'}`} />
                    <span className={`text-sm ${isOutOfStock ? 'text-red-400' : 'text-green-400'}`}>
                        {isOutOfStock ? "Out of Stock" : `${sweet.quantity} available`}
                    </span>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onPurchase(sweet)}
                        disabled={isOutOfStock}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary hover:bg-primary-hover disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-black font-bold rounded-lg transition-colors cursor-pointer"
                    >
                        <ShoppingBag className="h-4 w-4" />
                        {isOutOfStock ? "Sold Out" : "Buy Now"}
                    </button>

                    {isAdmin && (
                        <>
                            <button
                                onClick={() => onEdit(sweet, 'restock')}
                                className="p-2.5 bg-white/5 hover:bg-green-900/20 text-green-400 rounded-lg transition-colors border border-white/10 hover:border-green-500/30"
                                title="Restock"
                            >
                                <Package className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => onEdit(sweet, 'edit')}
                                className="p-2.5 bg-white/5 hover:bg-white/10 text-blue-400 rounded-lg transition-colors border border-white/10"
                                title="Edit"
                            >
                                <Edit className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => onDelete(sweet._id)}
                                className="p-2.5 bg-white/5 hover:bg-red-900/20 text-red-400 rounded-lg transition-colors border border-white/10 hover:border-red-500/30"
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
