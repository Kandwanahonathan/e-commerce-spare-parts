import React,{useState} from "react";

export default function Admin() {
    const user=JSON.parse(localStorage.getItem("user"))
    if (!user) {
        return <h2>first login</h2>
    }
    return(
        <div>
            <div>
                <h1>customer dash. {name}</h1>
            </div>
        </div>
    )
}