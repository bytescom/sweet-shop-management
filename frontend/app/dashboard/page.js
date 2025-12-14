"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import SweetCard from "@/components/SweetCard";
import SweetModal from "@/components/SweetModal";
import { Search, Plus, Loader2, X, Filter } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [filters, setFilters] = useState({
        name: "",
        category: "",
        minPrice: "",
        maxPrice: ""
    });

    const [modal, setModal] = useState({
        open: false,
        type: "create",
        sweet: null
    });

    // Redirect if not logged in
    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        }
    }, [authLoading, user, router]);

    // Fetch logic
    const fetchSweets = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (filters.name) params.append("name", filters.name);
            if (filters.category) params.append("category", filters.category);
            if (filters.minPrice) params.append("minPrice", filters.minPrice);
            if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

            const endpoint = params.toString() ? `/sweets/search?${params}` : "/sweets";
            const { data } = await api.get(endpoint);
            setSweets(data);
        } catch {
            setSweets([]);
        } finally {
            setLoading(false);
        }
    };

    // Debounce fetch when filters change
    useEffect(() => {
        if (user) {
            const timer = setTimeout(() => {
                fetchSweets();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [filters, user]);

    // Handlers
    const handlePurchase = async (sweet) => {
        try {
            const { data } = await api.post(`/sweets/${sweet._id}/purchase`);
            setSweets(prev => prev.map(s => s._id === sweet._id ? { ...s, quantity: data.quantity } : s));
            alert("Purchase Successful! Enjoy your " + sweet.name);
        } catch (error) {
            alert(error.response?.data?.message || "Purchase failed");
        }
    };

    const handleCreate = async (formData) => {
        try {
            await api.post("/sweets", formData);
            setModal({ open: false, type: "create", sweet: null });
            fetchSweets();
        } catch (error) {
            alert("Failed to create sweet");
        }
    };

    const handleUpdate = async (formData) => {
        try {
            await api.put(`/sweets/${modal.sweet._id}`, formData);
            setModal({ open: false, type: "create", sweet: null });
            fetchSweets();
        } catch (error) {
            alert("Failed to update sweet");
        }
    };

    const handleRestock = async (formData) => {
        try {
            await api.post(`/sweets/${modal.sweet._id}/restock`, { amount: formData.quantity });
            setModal({ open: false, type: "create", sweet: null });
            fetchSweets();
        } catch (error) {
            alert("Failed to restock sweet");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this sweet?")) return;
        try {
            await api.delete(`/sweets/${id}`);
            fetchSweets();
        } catch (error) {
            alert("Failed to delete sweet");
        }
    };

    const openModal = (type, sweet = null) => {
        setModal({ open: true, type, sweet });
    };

    const clearFilters = () => {
        setFilters({ name: '', category: '', minPrice: '', maxPrice: '' });
    };

    const hasActiveFilters = filters.name || filters.category || filters.minPrice || filters.maxPrice;

    if (authLoading || !user) return <div className="min-h-screen flex items-center justify-center bg-black text-primary"><Loader2 className="animate-spin h-8 w-8" /></div>;

    // Filter Sidebar Component
    const FilterSidebar = ({ isMobile = false }) => (
        <div className={`${isMobile ? 'p-6' : 'sticky top-4'}`}>
            <div className="bg-[#0A0A0A] border border-border rounded-2xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.3)]">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Filter className="h-5 w-5 text-primary" />
                        Filters
                    </h2>
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="text-xs text-red-400 hover:text-red-300 font-medium"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {/* Search */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-400 mb-3">Search</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Sweet name..."
                            className="w-full pl-9 pr-8 py-2.5 bg-black border border-border rounded-lg text-white placeholder-gray-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all text-sm"
                            value={filters.name}
                            onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
                        />
                        {filters.name && (
                            <button
                                onClick={() => setFilters(prev => ({ ...prev, name: '' }))}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white p-1"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Category */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-400 mb-3">Category</label>
                    <div className="space-y-2">
                        {['All', 'Milk', 'Dry', 'Fried', 'Ghee', 'Syrup'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilters(prev => ({ ...prev, category: cat === 'All' ? '' : cat }))}
                                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${(cat === 'All' && !filters.category) || filters.category === cat
                                    ? 'bg-primary text-black shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                                    : 'bg-black border border-border text-gray-400 hover:border-primary hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-3">Price Range</label>
                    <div className="space-y-3">
                        <input
                            type="number"
                            placeholder="Min ₹"
                            className="w-full px-3 py-2.5 bg-black border border-border rounded-lg text-white placeholder-gray-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 text-sm transition-all"
                            value={filters.minPrice}
                            onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                        />
                        <input
                            type="number"
                            placeholder="Max ₹"
                            className="w-full px-3 py-2.5 bg-black border border-border rounded-lg text-white placeholder-gray-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 text-sm transition-all"
                            value={filters.maxPrice}
                            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative h-[180px] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-primary/5 via-transparent to-black border-b border-border/50">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent" />
                <h1 className="relative text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-yellow-200 to-primary mb-2">
                    Dashboard
                </h1>
                <p className="relative text-gray-400 text-sm">
                    Browse and manage your sweets collection
                </p>
            </section>

            {/* Main Layout */}
            <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-8">
                <div className="flex gap-8">

                    {/* Left Sidebar - Desktop */}
                    <aside className="hidden lg:block w-80 flex-shrink-0">
                        <FilterSidebar />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">

                        {/* Mobile Filter Toggle + Admin Button */}
                        <div className="flex items-center justify-between mb-6 lg:mb-8">
                            {/* Mobile Filter Button */}
                            <button
                                onClick={() => setShowMobileFilters(!showMobileFilters)}
                                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-[#0A0A0A] border border-border rounded-lg text-gray-300 hover:text-white hover:border-primary transition-all"
                            >
                                <Filter className="h-4 w-4" />
                                <span className="text-sm font-medium">Filters</span>
                                {hasActiveFilters && (
                                    <span className="ml-1 px-2 py-0.5 bg-primary text-black text-xs font-bold rounded-full">
                                        {Object.values(filters).filter(Boolean).length}
                                    </span>
                                )}
                            </button>

                            {/* Admin Add Button */}
                            {user?.role === 'admin' && (
                                <button
                                    onClick={() => openModal('create')}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-black font-bold rounded-xl transition-all shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:shadow-[0_0_35px_rgba(212,175,55,0.35)]"
                                >
                                    <Plus className="h-5 w-5" />
                                    <span className="hidden sm:inline">Add Sweet</span>
                                    <span className="sm:hidden">Add</span>
                                </button>
                            )}
                        </div>

                        {/* Mobile Filter Panel */}
                        {showMobileFilters && (
                            <div className="lg:hidden mb-6">
                                <FilterSidebar isMobile />
                            </div>
                        )}

                        {/* Products Grid */}
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="animate-spin text-primary h-12 w-12" />
                            </div>
                        ) : sweets.length === 0 ? (
                            <div className="text-center py-20 bg-[#0A0A0A] border border-border rounded-2xl">
                                <p className="text-gray-500 text-lg mb-2">No sweets found</p>
                                <p className="text-gray-600 text-sm">Try adjusting your filters</p>
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="mt-4 text-primary hover:text-primary-hover underline text-sm font-medium"
                                    >
                                        Clear all filters
                                    </button>
                                )}
                            </div>
                        ) : (
                            <>
                                {/* Results Count */}
                                <div className="mb-4 text-sm text-gray-400">
                                    Showing <span className="text-white font-semibold">{sweets.length}</span> sweet{sweets.length !== 1 ? 's' : ''}
                                </div>

                                {/* Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                                    {sweets.map(sweet => (
                                        <SweetCard
                                            key={sweet._id}
                                            sweet={sweet}
                                            onPurchase={handlePurchase}
                                            isAdmin={user?.role === 'admin'}
                                            onEdit={(s, type) => openModal(type || 'edit', s)}
                                            onDelete={handleDelete}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </main>
                </div>
            </div>

            <SweetModal
                isOpen={modal.open}
                onClose={() => setModal({ ...modal, open: false })}
                sweet={modal.sweet}
                isRestock={modal.type === 'restock'}
                onSubmit={modal.type === 'create' ? handleCreate : modal.type === 'restock' ? handleRestock : handleUpdate}
            />
        </div>
    );
}
