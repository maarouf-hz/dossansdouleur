"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { title: "Dos & Lombaires", href: "/dos-lombaires" },
  { title: "Cou & Épaules", href: "/cou-epaules" },
  { title: "Posture & Ergonomie", href: "/posture-ergonomie" },
  { title: "Remèdes naturels", href: "/remedes-naturels" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl md:text-2xl font-black uppercase tracking-tighter">
            Dos <span className="text-emerald-600">Sans Douleur</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Button
                key={link.href}
                variant="ghost"
                asChild
                className={`transition-colors hover:text-emerald-600 hover:bg-emerald-50 ${
                  isActive ? "text-emerald-600 bg-emerald-50" : ""
                }`}
              >
                <Link href={link.href}>{link.title}</Link>
              </Button>
            );
          })}
        </nav>

        {/* Burger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] group"
          aria-label="Menu"
        >
          <span
            className={`block h-[2px] bg-slate-900 transition-all duration-300 origin-center ${
              isOpen ? "w-6 rotate-45 translate-y-[8px]" : "w-6"
            }`}
          />
          <span
            className={`block h-[2px] bg-slate-900 transition-all duration-300 ${
              isOpen ? "w-0 opacity-0" : "w-4"
            }`}
          />
          <span
            className={`block h-[2px] bg-slate-900 transition-all duration-300 origin-center ${
              isOpen ? "w-6 -rotate-45 -translate-y-[8px]" : "w-6"
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen border-t" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-4 py-4 gap-1 bg-background">
          {navLinks.map((link, i) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 text-[13px] font-bold uppercase tracking-wider rounded-md transition-all duration-200 ${
                  isActive
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-slate-700 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {/* Accent line */}
                <span
                  className={`w-1 h-4 rounded-full transition-colors ${
                    isActive ? "bg-emerald-600" : "bg-slate-200"
                  }`}
                />
                {link.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}