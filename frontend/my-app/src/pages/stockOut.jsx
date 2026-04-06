import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    MinusIcon,
    ShoppingBagIcon,
    ArrowPathIcon,
    MagnifyingGlassIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon
} from "@heroicons/react/24/outline";

export default function StockOut() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        productId: "",
        quantity: "",
        customer: "",
        sellingPrice: ""
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

    // Calculate sale value
    const getSaleValue = () => {
        return parseInt(form.quantity || 0) * parseFloat(selectedProduct?.price || 0);
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
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });

        if (name === "productId" && value) {
            const product = products.find(p => p.id == value);
            setSelectedProduct(product);
            setNewStockTotal((product?.quantity || 0) - parseInt(form.quantity || 0));
        } else if (name === "quantity" && selectedProduct) {
            setNewStockTotal((selectedProduct.quantity || 0) - parseInt(value || 0));
        }
    };

    const handleStockOut = async (e) => {
        e.preventDefault();
        if (!form.productId || !form.quantity || parseInt(form.quantity) > (selectedProduct?.quantity || 0)) {
            alert("Invalid quantity or insufficient stock!");
            return;
        }

        try {
            setLoading(true);
            const product = products.find(p => p.id == form.productId);
            const newQuantity = parseInt(product.quantity) - parseInt(form.quantity);
            
            await axios.put(`http://localhost:5000/user/update/${form.productId}`, {
                category: product.category,
                cost: product.cost,
                price: product.price,
                quantity: newQuantity
            });

            setSuccessMsg(`✅ Sold ${form.quantity} ${product.category} to ${form.customer || 'customer'} for ${formatFRW(getSaleValue())}`);
            fetchProducts();
            resetForm();
            setTimeout(() => setSuccessMsg(""), 6000);
        } catch (error) {
            console.error("StockOut error:", error);
            alert("Failed to process sale!");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setForm({ productId: "", quantity: "", customer: "", sellingPrice: "" });
        setSelectedProduct(null);
        setNewStockTotal(0);
        setSearchTerm("");
    };

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
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                        Stock Out
                    </h1>
                    <p className="text-gray-600 mt-2">Process sales & deliveries</p>
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
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-emerald-400 rounded-xl shadow-md">
                    <div className="flex items-center gap-3">
                        <CheckCircleIcon className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-emerald-800 text-lg">{successMsg}</h4>
                        </div>
                    </div>
                </div>
            )}

            {/* 🔥 LIVE PREVIEW */}
            {selectedProduct && (
                <div className="p-8 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-3xl shadow-2xl">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                            <ShoppingBagIcon className="w-12 h-12 text-orange-600" />
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
                            <div className="p-4 bg-white/50 backdrop-blur-sm rounded-2xl border">
                                <div className="text-3xl font-bold text-gray-900">{selectedProduct.category}</div>
                                <div className="text-lg text-gray-600 mt-2">Product</div>
                            </div>
                            <div className="p-4 bg-white/50 backdrop-blur-sm rounded-2xl border">
                                <div className="text-4xl font-bold text-orange-600">{selectedProduct.quantity}</div>
                                <div className="text-xl text-orange-700 mt-2">Current Stock</div>
                            </div>
                            <div className="p-4 bg-white/50 backdrop-blur-sm rounded-2xl border">
                                <div className="text-4xl font-bold text-red-600">{newStockTotal}</div>
                                <div className="text-xl text-red-700 mt-2">After Sale</div>
                            </div>
                            <div className="p-4 bg-white/50 backdrop-blur-sm rounded-2xl border">
                                <div className="text-3xl font-bold text-green-600">{formatFRW(getSaleValue())}</div>
                                <div className="text-xl text-green-700 mt-2">Sale Value</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Stock Out Form */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Process Sale</h2>
                
                <form onSubmit={handleStockOut} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                                className="w-full pl-16 pr-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 shadow-lg text-lg font-semibold appearance-none bg-gradient-to-r from-white to-gray-50 hover:shadow-xl transition-all"
                                value={form.productId}
                                onChange={handleChange}
                            >
                                <option value="">🔍 Choose product to sell...</option>
                                {filteredProducts.map(product => (
                                    <option key={product.id} value={product.id}>
                                        🛒 {product.category} (Stock: {product.quantity})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-4">
                            Quantity to Sell <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="quantity"
                            type="number"
                            min="1"
                            max={selectedProduct?.quantity}
                            required
                            className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-red-100 focus:border-red-500 shadow-lg text-xl font-bold text-center bg-gradient-to-r from-red-50 to-orange-50 hover:shadow-xl transition-all"
                            placeholder="5"
                            value={form.quantity}
                            onChange={handleChange}
                        />
                        {selectedProduct && parseInt(form.quantity || 0) > selectedProduct.quantity && (
                            <p className="mt-2 text-red-600 font-semibold text-sm">
                                ⚠️ Insufficient stock! Only {selectedProduct.quantity} available
                            </p>
                        )}
                    </div>

                    {/* Customer */}
                    <div className="lg:col-span-2">
                        <label className="block text-lg font-semibold text-gray-700 mb-4">Customer Name</label>
                        <input
                            name="customer"
                            className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 shadow-lg text-lg"
                            placeholder="John Nkurunziza"
                            value={form.customer}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Selling Price */}
                    <div className="lg:col-span-2">
                        <label className="block text-lg font-semibold text-gray-700 mb-4">Selling Price per Unit (FRW)</label>
                        <input
                            name="sellingPrice"
                            type="number"
                            step="100"
                            className="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 shadow-lg text-lg font-mono"
                            placeholder="250,000"
                            value={form.sellingPrice}
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
                            Refresh Stock
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !form.productId || !form.quantity || newStockTotal < 0}
                            className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-5 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            <MinusIcon className="w-6 h-6" />
                            Process Sale
                        </button>
                    </div>
                </form>
            </div>

            {/* Low Stock Alert */}
            {products.filter(p => p.quantity < 10).length > 0 && (
                <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-3xl p-8">
                    <div className="flex items-center gap-4">
                        <ExclamationTriangleIcon className="w-12 h-12 text-red-500 flex-shrink-0" />
                        <div>
                            <h3 className="text-2xl font-bold text-red-900 mb-2">Low Stock Alert!</h3>
                            <p className="text-lg text-red-800">
                                {products.filter(p => p.quantity < 10).length} products need restock
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}