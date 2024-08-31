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
            <HoveredLink href="/web-dev">Web Development</HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Book Bus"
              href="https://algochurn.com"
              src="/bus1.jpg"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Own a Bus"
              href="https://tailwindmasterkit.com"
              src="/bus2.avif"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Orders"
              href="https://gomoonbeam.com"
              src="/busticket2.jpg"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Tickets"
              href="https://userogue.com"
              src="/busticket.avif"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/signup">Looking for Bus?</HoveredLink>
            <HoveredLink href="/signupbus">Own A Bus?</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
        
      </Menu>
    </div>
  );
}
