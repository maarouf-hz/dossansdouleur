import Link from "next/link";
import { legalPagesMetadata } from "@/lib/seo";
export const metadata = legalPagesMetadata.mentionsLegales;


const LAST_UPDATE = "22 février 2026";

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="border-b-8 border-black pt-24 pb-12 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <nav className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">
            <Link href="/" className="hover:underline">
              Accueil
            </Link>{" "}
            / Mentions Légales
          </nav>
          <h1 className="text-5xl md:text-[8rem] font-black uppercase italic tracking-tighter leading-[0.85] mb-10">
            Mentions<br />Légales
          </h1>
          <p className="max-w-2xl text-xl font-medium text-slate-800 leading-tight italic border-l-8 border-emerald-500 pl-8">
            Conformément à la loi n°2004-575 du 21 juin 2004 pour la confiance
            dans l&apos;économie numérique (LCEN). Dernière mise à jour : {LAST_UPDATE}
          </p>
        </div>
      </header>

      {/* CONTENU */}
      <section className="container mx-auto px-6 md:px-12 py-20 max-w-4xl">
        <div className="space-y-16">

          <Bloc titre="1. Éditeur du site">
            <InfoGrid
              items={[
                { label: "Nom du site", value: "Dos Sans Douleur" },
                { label: "URL", value: "https://dossansdouleur.com" },
                { label: "Nature", value: "Blog à titre personnel" },
                {
                  label: "Directeur de publication",
                  value: "Identité disponible auprès de l'hébergeur sur demande des autorités"
                },
                {
                  label: "Contact",
                  value: "Via le formulaire de contact",
                  link: "/contact",
                },
              ]}
            />
            <p className="mt-6 text-sm text-slate-600">
              Ce site est un blog personnel édité sans but commercial direct.
              Conformément à l&apos;article 6-III-2 de la LCEN, l&apos;éditeur a choisi
              de rendre son identité accessible uniquement sur demande via
              le formulaire de contact.
            </p>
          </Bloc>

          <Bloc titre="2. Hébergement">
            <InfoGrid
              items={[
                {
                  label: "Hébergeur",
                  value: "contabo",
                },
                { label: "Adresse", value: "Welfenstrasse 22 81541 Munich Germany" },
                { label: "Site web", value: "https://contabo.com", link: "https://contabo.com" },
              ]}
            />
          </Bloc>

          <Bloc titre="3. Propriété intellectuelle">
            <p>
              L&apos;ensemble du contenu du site Dos Sans Douleur — textes,
              articles, photographies, graphismes, logo, structure — est
              protégé par le <strong>droit d&apos;auteur</strong> (Code de la
              Propriété Intellectuelle, articles L.111-1 et suivants).
            </p>
            <p>
              Toute reproduction, représentation, modification ou exploitation
              non autorisée de tout ou partie du site est strictement
              interdite et constituerait une contrefaçon, sanctionnée par
              les articles L.335-2 et suivants du Code de la Propriété
              Intellectuelle.
            </p>
          </Bloc>

          <Bloc titre="4. Responsabilité éditoriale">
            <p>
              Les informations publiées sur ce site sont de nature{" "}
              <strong>informative et éducative</strong>. Elles ne constituent
              pas des conseils médicaux et ne sauraient engager la
              responsabilité de l&apos;éditeur en cas de dommage résultant de
              leur utilisation.
            </p>
            <div className="mt-6 border-l-4 border-amber-400 bg-amber-50 p-6">
              <p className="text-xs font-black uppercase tracking-widest text-amber-700 mb-2">
                ⚠️ Avertissement santé
              </p>
              <p className="text-amber-800 text-sm leading-relaxed">
                Ce site traite de sujets liés à la santé. Les informations
                fournies ne remplacent pas l&apos;avis d&apos;un médecin ou d&apos;un
                professionnel de santé qualifié. Consultez un professionnel
                pour tout problème de santé.
              </p>
            </div>
          </Bloc>

          <Bloc titre="5. Données personnelles">
            <p>
              Le traitement des données personnelles collectées sur ce site
              est décrit dans notre{" "}
              <Link
                href="/politique-de-confidentialite"
                className="text-emerald-600 underline hover:no-underline font-bold"
              >
                Politique de Confidentialité
              </Link>
              , conformément au Règlement Général sur la Protection des
              Données (RGPD) et à la loi Informatique et Libertés modifiée.
            </p>
            <p>
              Vous disposez d&apos;un droit d&apos;accès, de rectification et de
              suppression de vos données. Pour exercer ces droits, contactez-
              nous via{" "}
              <Link href="/contact" className="text-emerald-600 underline hover:no-underline">
                notre formulaire de contact
              </Link>
              .
            </p>
          </Bloc>

          <Bloc titre="6. Cookies">
            <p>
              Ce site utilise des cookies. Conformément à la réglementation
              CNIL, votre consentement est demandé avant le dépôt de tout
              cookie non strictement nécessaire au fonctionnement du site.
              Pour plus de détails, consultez notre{" "}
              <Link
                href="/politique-de-confidentialite"
                className="text-emerald-600 underline hover:no-underline"
              >
                politique de confidentialité
              </Link>
              .
            </p>
          </Bloc>

          <Bloc titre="7. Liens hypertextes">
            <p>
              Le site Dos Sans Douleur peut contenir des liens vers des sites
              tiers. Ces liens sont proposés pour la commodité des
              utilisateurs. L&apos;éditeur n&apos;est pas responsable du contenu de ces
              sites externes.
            </p>
            <p>
              La création de liens hypertextes pointant vers le site Dos Sans
              Douleur est autorisée sous réserve de ne pas utiliser des
              techniques de framing et de mentionner clairement la source.
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
              des protections prévues par le RGPD, qui constitue l&apos;un des
              cadres juridiques les plus protecteurs en matière de données
              personnelles.
            </p>
          </Bloc>

          <Bloc titre="9. Droit applicable et litiges">
            <p>
              Les présentes mentions légales sont régies par le{" "}
              <strong>droit français</strong>. En cas de litige, les tribunaux
              français seront seuls compétents.
            </p>
            <p>
              En cas de litige avec un commerçant, vous pouvez recourir à la
              médiation de la consommation. Pour tout différend, vous pouvez
              également accéder à la plateforme de résolution en ligne des
              litiges mise en place par la Commission européenne :{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>
              .
            </p>
          </Bloc>

          {/* Liens vers autres pages légales */}
          <div className="border-t-4 border-black pt-12 flex flex-wrap gap-4">
            <Link
              href="/politique-de-confidentialite"
              className="px-6 py-2 border border-black font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors"
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/conditions-utilisation"
              className="px-6 py-2 border border-black font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors"
            >
              Conditions d&apos;utilisation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Bloc({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-6 border-b-4 border-black pb-3">
        {titre}
      </h2>
      <div className="text-slate-700 leading-relaxed space-y-4">{children}</div>
    </div>
  );
}

function InfoGrid({
  items,
}: {
  items: { label: string; value: string; note?: string; link?: string }[];
}) {
  return (
    <div className="divide-y divide-slate-100 border border-slate-200">
      {items.map((item) => (
        <div key={item.label} className="grid grid-cols-5 gap-4 px-6 py-4">
          <dt className="col-span-2 text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center">
            {item.label}
          </dt>
          <dd className="col-span-3 text-sm font-medium text-slate-800">
            {item.link ? (
              <Link
                href={item.link}
                className="text-emerald-600 underline hover:no-underline"
                {...(item.link.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {item.value}
              </Link>
            ) : (
              item.value
            )}
            {item.note && (
              <span className="ml-2 text-[10px] text-amber-600 font-black uppercase tracking-wide">
                ← {item.note}
              </span>
            )}
          </dd>
        </div>
      ))}
    </div>
  );
}