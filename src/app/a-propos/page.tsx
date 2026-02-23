import Link from "next/link";
import { legalPagesMetadata } from "@/lib/seo";
export const metadata = legalPagesMetadata.aPropos;

export default function AProposPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="border-b-8 border-black pt-24 pb-12 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <nav className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">
            <Link href="/" className="hover:underline">
              Accueil
            </Link>{" "}
            / À Propos
          </nav>
          <h1 className="text-6xl md:text-[10rem] font-black uppercase italic tracking-tighter leading-[0.8] mb-10">
            À Propos
          </h1>
          <p className="max-w-2xl text-xl md:text-3xl font-medium text-slate-800 leading-tight italic border-l-8 border-emerald-500 pl-8">
            Notre mission : vous aider à vivre sans douleur grâce à des
            informations fiables et accessibles.
          </p>
        </div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <section className="container mx-auto px-6 md:px-12 py-20 max-w-4xl">
        {/* Origine */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-8 border-b-4 border-emerald-500 pb-4">
            L&apos;origine du projet
          </h2>
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed font-medium">
            <p>
              Dos Sans Douleur est né d&apos;un constat simple : des millions de
              Français souffrent chaque année de douleurs dorsales, et
              pourtant, les informations claires, pratiques et scientifiquement
              fondées restent difficiles à trouver sur internet.
            </p>
            <p>
              Entre les forums de conseils approximatifs et les sites
              médicaux trop techniques, il manquait un espace intermédiaire —
              un blog qui parle vrai, qui vulgarise sans simplifier à l&apos;excès,
              et qui respecte le lecteur en citant ses sources.
            </p>
            <p>
              C&apos;est pour combler ce vide que ce blog a vu le jour.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="mb-20 bg-slate-900 text-white p-12">
          <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-8 text-emerald-400">
            Notre mission
          </h2>
          <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
            <p>
              Notre mission est simple : vous fournir des guides pratiques,
              des exercices thérapeutiques et des explications anatomiques
              claires pour comprendre et soulager vos douleurs dorsales —
              sans jargon inutile, sans sensationnalisme.
            </p>
            <p>
              Chaque article est rédigé en s&apos;appuyant sur des études
              scientifiques récentes, des recommandations de professionnels de
              santé (médecins, kinésithérapeutes, ostéopathes) et des
              données cliniques vérifiées.
            </p>
          </div>
        </div>

        {/* Ce que nous couvrons */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-10">
            Ce que nous couvrons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                titre: "Douleurs lombaires",
                desc: "Causes, exercices ciblés, postures correctrices et remèdes naturels pour le bas du dos.",
              },
              {
                titre: "Cervicalgies",
                desc: "Solutions pour soulager les tensions cervicales liées au travail sur écran et au stress.",
              },
              {
                titre: "Posture & ergonomie",
                desc: "Conseils pratiques pour améliorer votre posture au bureau, à la maison et en voiture.",
              },
              {
                titre: "Remèdes naturels",
                desc: "Huiles essentielles, étirements, thermothérapie et autres approches complémentaires.",
              },
              {
                titre: "Exercices thérapeutiques",
                desc: "Programmes progressifs validés pour renforcer le dos et prévenir les récidives.",
              },
              {
                titre: "Scoliose & hernies",
                desc: "Informations claires sur les pathologies courantes et les options de prise en charge.",
              },
            ].map((item) => (
              <div
                key={item.titre}
                className="p-6 border border-slate-200 hover:border-emerald-400 transition-colors"
              >
                <h3 className="font-black uppercase tracking-tight text-xl mb-2">
                  {item.titre}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Avertissement important */}
        <div className="border-l-4 border-amber-400 bg-amber-50 p-8 mb-20">
          <p className="text-xs font-black uppercase tracking-widest text-amber-700 mb-3">
            ⚠️ Important
          </p>
          <p className="text-slate-800 leading-relaxed">
            Le contenu de Dos Sans Douleur est fourni à titre{" "}
            <strong>informatif et éducatif uniquement</strong>. Il ne remplace
            pas l&apos;avis d&apos;un médecin ou d&apos;un professionnel de santé. En cas de
            douleur persistante, aiguë ou handicapante, consultez impérativement
            un professionnel qualifié.
          </p>
        </div>

        {/* Contact CTA */}
        <div className="text-center border-t-4 border-black pt-12">
          <p className="text-slate-600 mb-6 text-lg font-medium">
            Une question, une suggestion ou une collaboration ?
          </p>
          <Link
            href="/contact"
            className="inline-block bg-black text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors"
          >
            Nous contacter →
          </Link>
        </div>
      </section>
    </main>
  );
}