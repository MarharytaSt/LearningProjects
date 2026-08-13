import { CalendarIcon } from "lucide-react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../sidebar";
import { Link } from "react-router-dom";

export function AppSidebarBrand () {
    return (
        <SidebarMenu className="gap-2 px-1">
            <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                    <Link to='/events' className="gap-2">
                        <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <CalendarIcon></CalendarIcon>
                        </span>
                        <span className="font-heading font-semibold">
                            EventsHub
                        </span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}