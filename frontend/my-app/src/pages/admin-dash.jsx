import React,{useState} from "react";
import DashboardHome from "./dashboard";
export default function Admin() {
    const user=JSON.parse(localStorage.getItem("user"))
    if (!user) {
        return <h2>first login</h2>
    }
    return(
        <div className="flex">

            <div className="w-64 h-screen bg-gray-800 text-white p-4">
                <div className="bg-white rounded p-2 "><h2 className="font-bold text-xl text-blue-800 rounded">Nick Spares</h2></div>
                <ul className="space-y-3">
                    <li className=" text-xl hover:bg-blue-800 p-3 rounded" >Dashboard</li>
                    <li className=" text-xl hover:bg-blue-800 p-3 rounded">Products</li>
                    <li className=" text-xl hover:bg-blue-800 p-3 rounded">Categories</li>
                    <li className=" text-xl hover:bg-blue-800 p-3 rounded">Stock</li>
                    <li className=" text-xl hover:bg-blue-800 p-3 rounded">Reports</li>
                </ul>
            </div>
            <DashboardHome/>
        </div>
    )
}