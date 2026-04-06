import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    ArrowPathIcon,
    CheckCircleIcon
} from "@heroicons/react/24/outline";

export default function StockIn() {
    // States
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        productId: "",
        quantity: "",
        supplier: "",
        costPrice: ""
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newStockTotal, setNewStockTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    // FRW Formatter
    const formatFRW = (amount) => {
        return new Intl.NumberFormat('rw-RW', {
            style: 'currency',
            currency: 'RWF',
            minimumFractionDigits: 0
        }).format(parseFloat(amount) || 0);
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
            console.error("Products fetch error:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // ✅ LIVE PREVIEW + AUTO-CALC
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });

        // Auto-select product details
        if (name === "productId" && value) {
            const product = products.find(p => p.id == value);
            setSelectedProduct(product);
            setNewStockTotal((product?.quantity || 0) + parseInt(form.quantity || 0));
        } else if (name === "quantity" && selectedProduct) {
            setNewStockTotal((selectedProduct.quantity || 0) + parseInt(value || 0));
        }
    };

    const handleStockIn = async (e) => {
        e.preventDefault();
        if (!form.productId || !form.quantity) {
            alert("Please select product and quantity");
            return;
        }

        try {
            setLoading(true);
            const product = products.find(p => p.id == form.productId);
            const newQuantity = parseInt(product.quantity) + parseInt(form.quantity);
            
            // Update product quantity in DB
            await axios.put(`http://localhost:5000/user/update/${form.productId}`, {
                category: product.category,
                cost: product.cost,
                price: product.price,
                quantity: newQuantity
            });

            // Success
            setSuccessMsg(`✅ Added ${form.quantity} ${product.category} from ${form.supplier || 'supplier'}`);
            fetchProducts();
            resetForm();
            setTimeout(() => setSuccessMsg(""), 5000);
        } catch (error) {
            console.error("StockIn error:", error);
            alert("Failed to update stock!");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setForm({ productId: "", quantity: "", supplier: "", costPrice: "" });
        setSelectedProduct(null);
        setNewStockTotal(0);
        setSearchTerm("");
    };

    // Safe filter
    const filteredProducts = products.filter(product => {
        const category = (product.category || '').toString().toLowerCase();
        const search = searchTerm.toLowerCase();
        return category.includes(search);
    });

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Stock In
                    </h1>
                    <p className="text-gray-600 mt-2">Receive new inventory</p>
                </div>
                <button
                    onClick={resetForm}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2"
                >
                    <ArrowPathIcon className="w-5 h-5" />
                    Reset
                </button>
            </div>

            {/* Success Message */}
            {successMsg && (
                <div className="p-6 bg-emerald-50 border-l-4 border-emerald-400 rounded-xl shadow-md animate-pulse">
                    <div className="flex items-center gap-3">
                        <CheckCircleIcon className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                        <div className="flex-1">
                            <h4 className="font-bold text-emerald-800 text-lg">{successMsg}</h4>
                        </div>
                    </div>
                </div>
            )}

            {/* 🔥 LIVE PREVIEW */}
            {selectedProduct && (
                <div className="p-8 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-3xl shadow-2xl animate-in slide-in-from-top-2 duration-500">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                            <span className="text-3xl font-bold">📦</span>
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                            <div className="p-4 bg-white/50 backdrop-blur-sm rounded-2xl border">
                                <div className="text-3xl font-bold text-gray-900">{selectedProduct.category}</div>
                                <div className="text-lg text-gray-600 mt-2">Selected Product</div>
                            </div>
                            <div className="p-4 bg-white/50 backdrop-blur-sm rounded-2xl border">
                                <div className="text-4xl font-bold text-emerald-600">{selectedProduct.quantity}</div>
                                <div className="text-xl text-emerald-700 mt-2">Current Stock</div>
                            </div>
                            <div className="p-4 bg-white/50 backdrop-blur-sm rounded-2xl border">
                                <div className="text-4xl font-bold text-blue-600">{newStockTotal}</div>
                                <div className="text-xl text-blue-700 mt-2">New Total</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Stock In Form */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Receive New Stock</h2>
                
                <form onSubmit={handleStockIn} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Product Selector */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-4">
                            Select Product <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 absolute left-4 top-5" />
                            <select
                                name="productId"
                                required
                                className="w-full pl-16 pr-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 shadow-lg text-lg font-semibold appearance-none bg-gradient-to-r from-white to-gray-50 hover:shadow-xl transition-all"
                                value={form.productId}
                                onChange={handleChange}
                            >
                                <option value="">🔍 Choose product...</option>
                                {filteredProducts.map(product => (
                                    <option key={product.id} value={product.id}>
                                        📦 {product.category} (Stock: {product.quantity})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-4">
                            Quantity to Add <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="quantity"
                            type="number"
                            min="1"
                            required
                            className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 shadow-lg text-xl font-bold text-center bg-gradient-to-r from-emerald-50 to-green-50 hover:shadow-xl transition-all"
                            placeholder="50"
                            value={form.quantity}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Supplier */}
                    <div className="lg:col-span-2">
                        <label className="block text-lg font-semibold text-gray-700 mb-4">Supplier Name</label>
                        <input
                            name="supplier"
                            className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 shadow-lg text-lg"
                            placeholder="Kigali Auto Parts Ltd"
                            value={form.supplier}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Cost Price */}
                    <div className="lg:col-span-2">
                        <label className="block text-lg font-semibold text-gray-700 mb-4">Cost Price per Unit (FRW)</label>
                        <input
                            name="costPrice"
                            type="number"
                            step="100"
                            className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 shadow-lg text-lg"
                            placeholder="125,000"
                            value={form.costPrice}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="lg:col-span-2 flex flex-col sm:flex-row gap-4 pt-6">
                        <button
                            type="button"
                            onClick={fetchProducts}
                            disabled={loading}
                            className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-5 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all disabled:opacity-50"
                        >
                            <ArrowPathIcon className={`w-6 h-6 mr-2 ${loading ? 'animate-spin' : ''}`} />
                            Refresh Products
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !form.productId || !form.quantity}
                            className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-5 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            <CheckCircleIcon className="w-6 h-6" />
                            Receive Stock Now
                        </button>
                    </div>
                </form>
            </div>

            {/* Search Products */}
            <div className="bg-white rounded-3xl shadow-2xl border p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <MagnifyingGlassIcon className="w-6 h-6" />
                    Available Products ({filteredProducts.length})
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 rounded-xl">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Category</th>
                                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">Current Stock</th>
                                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">Low Stock Alert</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredProducts.slice(0, 10).map(product => (
                                <tr key={product.id} className="hover:bg-gray-50 rounded-xl">
                                    <td className="px-6 py-4 font-semibold text-gray-900">
                                        📦 {product.category}
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-2xl">
                                        {product.quantity}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                                            product.quantity < 10 ? 'bg-red-100 text-red-800' :
                                            product.quantity < 30 ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-emerald-100 text-emerald-800'
                                        }`}>
                                            {product.quantity < 10 ? '🔴 LOW' : 
                                             product.quantity < 30 ? '🟡 Medium' : '🟢 Good'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}