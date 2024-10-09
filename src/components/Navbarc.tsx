"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/Navbar";
import { cn } from "@/lib/utils";
import Toggler from "@/components/Toggler"
export default function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/signup">Book tickets</HoveredLink>
            <HoveredLink href="/orders">Order</HoveredLink>
            <HoveredLink href="/dashboard">Dashboard</HoveredLink>
            <HoveredLink href="https://github.com/AKHIL-DyC">github</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Menu">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Book Bus"
              href="/"
              src="/bus1.jpg"
              description="Book bus ticket for the best price"
            />
            <ProductItem
              title="Own a Bus"
              href="/signupbus"
              src="/bus2.avif"
              description="Join the blue bus to list your bus"
            />
            <ProductItem
              title="Orders"
              href="/orders"
              src="/busticket2.jpg"
              description="Your order page"
            />
            <ProductItem
              title="Tickets"
              href="/orders"
              src="/busticket.avif"
              description="See all your tickets"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Signup">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/signup">Looking for Bus?</HoveredLink>
            <HoveredLink href="/signupbus">Own A Bus?</HoveredLink>
           
          </div>
        </MenuItem>
        
      </Menu>
    </div>
  );
}
