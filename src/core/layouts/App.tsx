import React from "react";
import Navbar from "../components/Navbar";
import Meta from "../components/Meta";
import {useRouter} from "next/router";

const hideNavbarPage = ['/success','/login']

export default function AppLayout({children}) {
    //keeping track of which route we are on to show navbar only in specific conditions
    const router = useRouter();
    const hideNavBar = hideNavbarPage.includes(router.asPath)
    return(
			<>
				<Meta/>
				{hideNavBar ? null : <Navbar/>}
				{children}
			</>
    );
}
