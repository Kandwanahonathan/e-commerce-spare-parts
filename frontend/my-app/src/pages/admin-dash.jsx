import React,{useState} from "react";
import DashboardHome from "./dashboard";
import Stock from "./stock";
import Reports from "./report";
import Products from "./product";
import Categories from "./categories";
export default function Admin() {
    const user=JSON.parse(localStorage.getItem("user"))
    if (!user) {
        return <h2>first login</h2>
    }
    const [active, setActive]=useState("")
    return(
        <div className="flex">

            <div className="w-64 h-screen bg-gray-800 text-white p-4">
                <div className="bg-white rounded p-2 "><h2 className="font-bold text-xl text-blue-800 rounded">Nick Spares</h2></div>
                <ul className="space-y-3">
                    <li className={`p-2 rounded cursor-pointer ${
                        active==="dashboard"? "bg-gray-500":"hover:bg-blue-800"
                     }`} onClick={()=>setActive("dashboard")}>Dashboard</li>
                    <li className={`p-2 rounded cursor-pointer ${
                        active==="products"? "bg-gray-500":"hover:bg-blue-800"
                     }`} onClick={()=>setActive("products")}>Products</li>
                    <li className={`p-2 rounded cursor-pointer ${
                        active==="categories"? "bg-gray-500":"hover:bg-blue-800"
                     }`} onClick={()=>setActive("categories")}>Categories</li>
                    <li className={`p-2 rounded cursor-pointer ${
                        active==="stock"? "bg-gray-500":"hover:bg-blue-800"
                     }`} onClick={()=>setActive("stock")}>Stock</li>
                    <li className={`p-2 rounded cursor-pointer ${
                        active==="reports"? "bg-gray-500":"hover:bg-blue-800"
                     }`} onClick={()=>setActive("reports")}>Reports</li>
                </ul>
            </div>
            {active ==="dashboard" && <DashboardHome/>}
            {active ==="product" && <Products/>}
            {active ==="Stock" && <Stock/>}
            {active ==="Categories" && <Categories/>}
            {active ==="Report" && <Reports/>}
        </div>
    )
}