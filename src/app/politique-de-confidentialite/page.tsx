import Link from "next/link";
import { legalPagesMetadata } from "@/lib/seo";
export const metadata = legalPagesMetadata.confidentialite;


const LAST_UPDATE = "22 février 2026";

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="border-b-8 border-black pt-24 pb-12 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <nav className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">
            <Link href="/" className="hover:underline">
              Accueil
            </Link>{" "}
            / Politique de Confidentialité
          </nav>
          <h1 className="text-4xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] mb-10">
            Politique de<br />Confidentialité
          </h1>
          <p className="max-w-2xl text-xl font-medium text-slate-800 leading-tight italic border-l-8 border-emerald-500 pl-8">
            Dernière mise à jour : {LAST_UPDATE}
          </p>
        </div>
      </header>

      {/* CONTENU */}
      <section className="container mx-auto px-6 md:px-12 py-20 max-w-4xl">
        <div className="prose prose-slate max-w-none space-y-16">

          <Bloc titre="1. Responsable du traitement">
            <p>
              Le site <strong>Dos Sans Douleur</strong> (accessible à l&apos;adresse{" "}
              <strong>https://dossansdouleur.com</strong>) est édité à titre
              personnel. Pour toute question relative à vos données personnelles,
              vous pouvez nous contacter via la{" "}
              <Link href="/contact" className="text-emerald-600 underline hover:no-underline">
                page de contact
              </Link>
              .
            </p>
          </Bloc>

          <Bloc titre="2. Données collectées">
            <p>Nous collectons uniquement les données strictement nécessaires :</p>
            <ul className="space-y-3 mt-4">
              {[
                {
                  label: "Formulaire de contact",
                  val: "Nom, adresse e-mail, message. Ces données sont utilisées uniquement pour répondre à votre demande.",
                },
                {
                  label: "Cookies analytiques",
                  val: "Nous utilisons des outils d'analyse (par ex. Google Analytics ou une alternative respectueuse de la vie privée) pour mesurer l'audience du site de manière anonymisée.",
                },
                {
                  label: "Données de navigation",
                  val: "Adresse IP, type de navigateur, pages visitées — collectées automatiquement par notre hébergeur.",
                },
              ].map((d) => (
                <li key={d.label} className="border-l-4 border-slate-200 pl-4">
                  <strong className="font-black text-sm uppercase tracking-wide">
                    {d.label} :
                  </strong>{" "}
                  <span className="text-slate-600 text-sm">{d.val}</span>
                </li>
              ))}
            </ul>
          </Bloc>

          <Bloc titre="3. Base légale du traitement">
            <p>
              Les traitements de données réalisés sur ce site reposent sur les
              bases légales suivantes :
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "Votre consentement (cookies analytiques)",
                "L'intérêt légitime du responsable de traitement (sécurité, lutte contre la fraude)",
                "L'exécution d'une mesure pré-contractuelle (formulaire de contact)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="mt-1.5 w-2 h-2 bg-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Bloc>

          <Bloc titre="4. Durée de conservation">
            <p>
              Les données issues du formulaire de contact sont conservées pendant{" "}
              <strong>12 mois</strong> maximum, puis supprimées. Les données
              analytiques sont conservées sous forme agrégée et anonymisée selon
              les paramètres de l&apos;outil utilisé.
            </p>
          </Bloc>

          <Bloc titre="5. Vos droits (RGPD)">
            <p>
              Conformément au Règlement Général sur la Protection des Données
              (RGPD) et à la loi Informatique et Libertés, vous disposez des
              droits suivants :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {[
                { droit: "Droit d'accès", desc: "Obtenir une copie de vos données." },
                { droit: "Droit de rectification", desc: "Corriger des données inexactes." },
                { droit: "Droit à l'effacement", desc: 'Demander la suppression ("droit à l\'oubli").' },
                { droit: "Droit à la portabilité", desc: "Récupérer vos données dans un format standard." },
                { droit: "Droit d'opposition", desc: "Vous opposer à certains traitements." },
                { droit: "Droit à la limitation", desc: "Limiter l'utilisation de vos données." },
              ].map((r) => (
                <div key={r.droit} className="border border-slate-200 p-4 hover:border-emerald-400 transition-colors">
                  <p className="font-black uppercase text-sm tracking-tight">{r.droit}</p>
                  <p className="text-slate-500 text-xs mt-1">{r.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-600">
              Pour exercer ces droits, contactez-nous via la{" "}
              <Link href="/contact" className="text-emerald-600 underline">
                page contact
              </Link>
              . En cas de réponse insatisfaisante, vous pouvez saisir la{" "}
              <strong>CNIL</strong> (Commission Nationale de l&apos;Informatique et
              des Libertés) à l&apos;adresse{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 underline"
              >
                www.cnil.fr
              </a>
              .
            </p>
          </Bloc>

          <Bloc titre="6. Cookies">
            <p>
              Ce site utilise des cookies. Lors de votre première visite, un
              bandeau vous informe de leur présence et vous donne la possibilité
              de les accepter ou de les refuser. Vous pouvez à tout moment
              modifier vos préférences via les paramètres de votre navigateur.
            </p>
            <p className="mt-4 text-sm text-slate-600">
              Types de cookies utilisés :
            </p>
            <ul className="mt-3 space-y-2">
              {[
                "Cookies strictement nécessaires (fonctionnement du site)",
                "Cookies analytiques (mesure d'audience, anonymisés)",
              ].map((c) => (
                <li key={c} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="mt-1.5 w-2 h-2 bg-emerald-500 flex-shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </Bloc>

          <Bloc titre="7. Sécurité">
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles
              appropriées pour protéger vos données contre tout accès non
              autorisé, toute perte ou altération. La connexion au site est
              sécurisée par le protocole <strong>HTTPS / TLS</strong>.
            </p>
          </Bloc>

          <Bloc titre="8. Audience internationale">
            <p>
              Ce site s&apos;adresse à un public francophone international,
              notamment en <strong>France, Belgique, Suisse, Canada</strong> et
              dans les <strong>pays d&apos;Afrique francophone</strong>.
            </p>
            <p>
              Le droit français et le RGPD européen s&apos;appliquent à ce site.
              Les utilisateurs situés hors de France bénéficient au minimum
              des protections prévues par le RGPD, qui est l&apos;un des
              cadres de protection des données les plus stricts au monde.
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "🇧🇪 Belgique — applique directement le RGPD (pays membre de l'UE)",
                "🇨🇭 Suisse — la nLPD suisse est alignée avec le RGPD",
                "🇨🇦 Canada — la loi PIPEDA/Loi 25 est couverte par notre conformité RGPD",
                "🌍 Afrique francophone — vous bénéficiez des protections RGPD, supérieures aux exigences locales",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="mt-1.5 w-2 h-2 bg-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Bloc>

          <Bloc titre="9. Modifications">

            <p>
              Cette politique de confidentialité peut être mise à jour à tout
              moment. La date de dernière mise à jour est indiquée en haut de
              cette page. Nous vous encourageons à la consulter régulièrement.
            </p>
          </Bloc>
        </div>
      </section>
    </main>
  );
}

function Bloc({
  titre,
  children,
}: {
  titre: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-6 border-b-4 border-black pb-3">
        {titre}
      </h2>
      <div className="text-slate-700 leading-relaxed space-y-4">{children}</div>
    </div>
  );
}