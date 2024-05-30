"use client"

import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";

const UserAccountNav =() =>{
    return(
       <DropdownMenu>
        <DropdownMenuTrigger asChild className="overflow-visible">
            <Button variant={"ghost"} size='sm' className="relative">My Account</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-wite w-60" align='end'>
            <div className="flex items-center justify-center gap-2 p-2"></div>
        </DropdownMenuContent>
       </DropdownMenu>
    )
}

export default UserAccountNav;