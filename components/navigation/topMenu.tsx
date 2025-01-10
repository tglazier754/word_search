import * as React from "react"
import Link from "next/link";
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react";


export async function TopMenu() {

    return (
        <nav className="bg-background border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center h-16">
                        <Link href="/library" className="text-2xl font-bold text-primary mr-10">
                            Word Search
                        </Link>
                    </div>
                </div>
            </div>
        </nav >
    )
}


export default TopMenu;