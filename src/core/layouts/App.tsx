import React from "react";
import Navbar from "../components/Navbar";
import Meta from "../components/Meta";

export default function AppLayout({children}) {
    return(
        <>
        <Meta/>
        <Navbar/>
        {children}
        </>
    );
}
