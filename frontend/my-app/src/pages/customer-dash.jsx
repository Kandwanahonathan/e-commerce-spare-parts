import React,{useState} from "react";
import Login from "./login";
export default function Customer() {
    const user=JSON.parse(localStorage.getItem("user"))
   if (!user) {
    return <h2>login first</h2>
   }

    return(
        <div>
            <div>
                <h1>customer dash. {user.name}</h1>
            </div>
        </div>
    )
}