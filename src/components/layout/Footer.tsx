import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const categories = [
    { name: "Remèdes naturels", href: "/remedes-naturels" },
    { name: "Posture & Ergonomie", href: "/posture-ergonomie" },
    { name: "Cou & Épaules", href: "/cou-epaules" },
    { name: "Dos & Lombaires", href: "/dos-lombaires" },
  ];

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Section 1: À propos / Mission */}
          <div className="space-y-4">
            <h3 className="text-xl font-black uppercase tracking-tighter">
              Dos <span className="text-emerald-600">Sans Douleur</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Expertise et conseils naturels pour votre santé vertébrale. Nous aidons les Français à retrouver une vie active sans douleur grâce à des guides validés.
            </p>
          </div>

          {/* Section 2: Navigation Catégories (SEO Silo) */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-6">Explorez</h4>
            <ul className="space-y-3 text-sm font-medium">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link href={cat.href} className="text-slate-600 hover:text-emerald-600 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Mentions Légales (Confiance Google) */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-6">Informations</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-600">
              <li><Link href="/a-propos" className="hover:text-emerald-600 transition">À propos de l'expert</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-600 transition">Contactez-nous</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-emerald-600 transition">Mentions légales</Link></li>
              <li><Link href="/politique-de-confidentialite" className="hover:text-emerald-600 transition">Confidentialité</Link></li>
              <li><Link href="/conditions-utilisation" className="hover:text-emerald-600 transition">Conditions d'utilisation</Link></li>
            </ul>
          </div>

          {/* Section 4: Newsletter (Conversion) */}
          {/* <div className="bg-white p-6 border border-slate-200 shadow-sm">
            <h4 className="font-bold text-sm uppercase mb-2">Guide Offert</h4>
            <p className="text-xs text-slate-500 mb-4 font-medium">Recevez nos 5 meilleurs exercices pour soulager vos lombaires.</p>
            <div className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="text-sm border p-2 focus:outline-emerald-600"
              />
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-none font-bold uppercase text-xs tracking-tighter">
                Rejoindre
              </Button>
            </div>
          </div> */}

        </div>

        <div className="border-t border-slate-200 pt-8 mt-8">
          <p className="text-[10px] text-slate-400 leading-normal text-center max-w-3xl mx-auto uppercase tracking-wide">
            Avertissement : Les informations sur Dos Sans Douleur sont à titre indicatif. 
            Elles ne remplacent en aucun cas l'avis d'un professionnel de santé (médecin, kinésithérapeute).
          </p>
          <div className="text-center mt-6 text-xs font-bold text-slate-400">
            © {new Date().getFullYear()} DOS SANS DOULEUR — TOUS DROITS RÉSERVÉS.
          </div>
        </div>
      </div>
    </footer>
  );
}