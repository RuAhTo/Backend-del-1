import Categories from "./Categories";
import MainHeader from "./MainHeader";
import { useState } from "react";

export default function MainPage(){


    return(
        <>
        <header>
            <MainHeader/>
        </header>
        <main>
            <Categories/>
        </main>
        </>
    )

}