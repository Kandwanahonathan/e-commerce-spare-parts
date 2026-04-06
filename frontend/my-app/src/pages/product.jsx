import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    ArrowPathIcon
} from "@heroicons/react/24/outline";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        category: "",
        cost: "",
        price: "",
        quantity: ""
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    // 💰 FRW Formatter
    const formatFRW = (amount) => {
        return new Intl.NumberFormat('rw-RW', {
            style: 'currency',
            currency: 'RWF',
            minimumFractionDigits: 0
        }).format(parseFloat(amount) || 0);
    };

    // Calculate profit
    const getProfit = (cost, price) => {
        const profit = parseFloat(price || 0) - parseFloat(cost || 0);
        return profit > 0 ? `+${profit.toLocaleString()} FRW` : `${profit.toLocaleString()} FRW`;
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:5000/user/select");
            setProducts(res.data || []);
        } catch (error) {
            console.error("Fetch error:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`http://localhost:5000/user/update/${editingId}`, form);
            } else {
                await axios.post("http://localhost:5000/user/add", form);
            }
            fetchProducts();
            resetForm();
        } catch (error) {
            console.error("Submit error:", error);
            alert("Operation failed! Check console.");
        }
    };

    const editProduct = (product) => {
        setForm({
            category: product.category || "",
            cost: product.cost || "",
            price: product.price || "",
            quantity: product.quantity || ""
        });
        setEditingId(product.id);
        setShowForm(true);
    };

    const deleteProduct = async (id) => {
        if (window.confirm("Delete this product?")) {
            try {
                await axios.delete(`http://localhost:5000/user/delete/${id}`);
                fetchProducts();
            } catch (error) {
                console.error("Delete error:", error);
                alert("Delete failed!");
            }
        }
    };

    const resetForm = () => {
        setForm({ category: "", cost: "", price: "", quantity: "" });
        setEditingId(null);
        setShowForm(false);
    };

    // ✅ SAFE search filter
    const filteredProducts = products.filter(product => {
        const category = (product.category || '').toString().toLowerCase();
        const search = searchTerm.toLowerCase();
        return category.includes(search);
    });

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Products Inventory</h1>
                    <p className="text-gray-600 mt-1">Manage Nick Spares stock</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg transition-all"
                >
                    <PlusIcon className="w-5 h-5" />
                    Add New Product
                </button>
            </div>

            {/* Search & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-2">
                    <div className="relative">
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-4 top-4" />
                        <input
                            type="text"
                            placeholder="Search by category..."
                            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="text-right md:text-left">
                    <div className="text-3xl font-bold text-gray-900">{filteredProducts.length}</div>
                    <div className="text-sm text-gray-500">Total Items</div>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="p-16 text-center">
                        <ArrowPathIcon className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
                        <p className="text-lg text-gray-500">Loading products...</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="p-16 text-center py-20">
                        <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <MagnifyingGlassIcon className="w-12 h-12 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products yet</h3>
                        <p className="text-gray-500 mb-6">Start by adding your first spare part</p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                        >
                            Add First Product
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                <tr>
                                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ID</th>
                                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Category</th>
                                    <th className="px-8 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Cost Price</th>
                                    <th className="px-8 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Selling Price</th>
                                    <th className="px-8 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Stock</th>
                                    <th className="px-8 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Profit</th>
                                    <th className="px-8 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredProducts.map((product) => {
                                    const profit = parseFloat(product.price || 0) - parseFloat(product.cost || 0);
                                    return (
                                        <tr key={product.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all">
                                            <td className="px-8 py-6 text-sm font-semibold text-gray-900">{product.id}</td>
                                            <td className="px-8 py-6">
                                                <span className="inline-flex px-3 py-1 text-sm font-semibold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full shadow-sm">
                                                    {product.category || 'General'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="text-sm text-gray-900 font-medium">
                                                    {formatFRW(product.cost)}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="text-lg font-bold text-green-600">
                                                    {formatFRW(product.price)}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <span className={`px-3 py-1 text-sm font-bold rounded-full shadow-sm ${
                                                    product.quantity > 20 ? 'bg-green-100 text-green-800' :
                                                    product.quantity > 5 ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {product.quantity || 0}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <span className={`text-sm font-bold px-2 py-1 rounded-full shadow-sm ${
                                                    profit > 0 
                                                        ? 'bg-emerald-100 text-emerald-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {getProfit(product.cost, product.price)}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right space-x-2">
                                                <button
                                                    onClick={() => editProduct(product)}
                                                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-xl transition-all hover:scale-105 shadow-sm"
                                                    title="Edit"
                                                >
                                                    <PencilIcon className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => deleteProduct(product.id)}
                                                    className="p-2 text-red-600 hover:bg-red-100 rounded-xl transition-all hover:scale-105 shadow-sm"
                                                    title="Delete"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50" onClick={resetForm}>
                    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold text-gray-900">
                                {editingId ? 'Edit Product' : 'Add New Product'}
                            </h3>
                            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 text-3xl font-bold">
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Category *</label>
                                <input
                                    name="category"
                                    required
                                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 shadow-sm text-lg"
                                    placeholder="e.g. Brakes, Engine Parts"
                                    value={form.category}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">Cost Price (FRW) *</label>
                                    <input
                                        name="cost"
                                        type="number"
                                        step="100"
                                        required
                                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 shadow-sm text-lg"
                                        placeholder="125000"
                                        value={form.cost}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">Selling Price (FRW) *</label>
                                    <input
                                        name="price"
                                        type="number"
                                        step="100"
                                        required
                                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 shadow-sm text-lg"
                                        placeholder="250000"
                                        value={form.price}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Stock Quantity *</label>
                                <input
                                    name="quantity"
                                    type="number"
                                    min="0"
                                    required
                                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 shadow-sm text-lg"
                                    placeholder="25"
                                    value={form.quantity}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex justify-end gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold text-lg shadow-md hover:shadow-lg transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all disabled:opacity-50"
                                >
                                    {editingId ? 'Update Product' : 'Add Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}