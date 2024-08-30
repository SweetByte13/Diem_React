import React, { useEffect, useState } from "react";
import Logo from "./Logo";

function Header(){
    return(
        <header className="bg-dark-bckground sticky top-0 z-[20] mx-auto flex w-full items-center justify-between br"> 
            <h1>Header</h1>
        </header>
    );
};

export default Header;