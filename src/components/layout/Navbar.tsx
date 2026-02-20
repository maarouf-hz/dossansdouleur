import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { title: "Remèdes naturels", href: "/remedes-naturels" },
  { title: "Posture & Ergonomie", href: "/posture-ergonomie" },
  { title: "Cou & Épaules", href: "/cou-epaules" },
  { title: "Dos & Lombaires", href: "/dos-lombaires" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl md:text-2xl font-black uppercase tracking-tighter">
            Dos <span className="text-emerald-600">Sans Douleur</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild className="hover:text-emerald-600 hover:bg-emerald-50 transition-colors">
              <Link href={link.href}>
                {link.title}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button 
            variant="default" 
            className="rounded-none font-bold uppercase tracking-tighter px-6 bg-slate-900 hover:bg-emerald-700 text-white transition-all"
          >
            S'abonner
          </Button>
        </div>
      </div>
    </header>
  );
}