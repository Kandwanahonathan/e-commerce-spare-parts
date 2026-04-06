import React, { useState, useEffect } from "react";
import DashboardHome from "./dashboard";
import StockIn from "./stockIn";
import StockOut from "./stockOut";
import Reports from "./report";
import Products from "./product";
import Sales from "./sales";
// import Categories from "./categories"; // Uncomment if you have this

export default function Admin() {
    const [user, setUser] = useState(null);
    const [active, setActive] = useState("dashboard"); // Default to dashboard

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) {
        return <h2 className="p-8 text-center">Please login first</h2>;
    }

    const renderContent = () => {
        switch (active) {
            case "dashboard":
                return <DashboardHome />;
            case "products":
                return <Products />;
            case "stockIn":
                return <StockIn />;
            case "stockOut":
                return <StockOut />;
            case "reports":
                return <Reports />;
            case "sales":
                return <Sales />;
            default:
                return <DashboardHome />;
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-4 flex flex-col">
                <div className="bg-white rounded p-2 mb-6">
                    <h2 className="font-bold text-xl text-blue-800">Nick Spares</h2>
                </div>
                <ul className="space-y-2 flex-1">
                    <li 
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            active === "dashboard" ? "bg-blue-600 text-white" : "hover:bg-blue-700"
                        }`}
                        onClick={() => setActive("dashboard")}
                    >
                        📊 Dashboard
                    </li>
                    <li 
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            active === "products" ? "bg-blue-600 text-white" : "hover:bg-blue-700"
                        }`}
                        onClick={() => setActive("products")}
                    >
                        📦 Products
                    </li>
                    <li 
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            active === "stockIn" ? "bg-blue-600 text-white" : "hover:bg-blue-700"
                        }`}
                        onClick={() => setActive("stockIn")}
                    >
                        ➕ Stock In
                    </li>
                    <li 
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            active === "stockOut" ? "bg-blue-600 text-white" : "hover:bg-blue-700"
                        }`}
                        onClick={() => setActive("stockOut")}
                    >
                        ➖ Stock Out
                    </li>
                    <li 
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            active === "reports" ? "bg-blue-600 text-white" : "hover:bg-blue-700"
                        }`}
                        onClick={() => setActive("reports")}
                    >
                        📈 Reports
                    </li>
                    <li 
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            active === "sales" ? "bg-blue-600 text-white" : "hover:bg-blue-700"
                        }`}
                        onClick={() => setActive("sales")}
                    >
                        💰 Sales
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-50">
                {renderContent()}
            </div>
        </div>
    );
}