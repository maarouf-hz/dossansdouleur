import Link from "next/link";
import { legalPagesMetadata } from "@/lib/seo";
export const metadata = legalPagesMetadata.conditions;

const LAST_UPDATE = "22 février 2026";

export default function ConditionsUtilisationPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="border-b-8 border-black pt-24 pb-12 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <nav className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">
            <Link href="/" className="hover:underline">
              Accueil
            </Link>{" "}
            / Conditions d&apos;utilisation
          </nav>
          <h1 className="text-4xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] mb-10">
            Conditions<br />d&apos;utilisation
          </h1>
          <p className="max-w-2xl text-xl font-medium text-slate-800 leading-tight italic border-l-8 border-emerald-500 pl-8">
            Dernière mise à jour : {LAST_UPDATE}
          </p>
        </div>
      </header>

      {/* AVERTISSEMENT SANTÉ */}
      <div className="bg-amber-50 border-y-4 border-amber-400">
        <div className="container mx-auto px-6 md:px-12 py-8 max-w-4xl">
          <p className="text-xs font-black uppercase tracking-widest text-amber-700 mb-3">
            ⚠️ Avertissement médical important
          </p>
          <p className="text-amber-800 leading-relaxed font-medium">
            Le contenu de ce site est fourni à titre{" "}
            <strong>informatif et éducatif uniquement</strong>. Il ne constitue
            pas un avis médical et ne remplace en aucun cas une consultation
            avec un professionnel de santé qualifié. En cas de douleur
            persistante, aiguë ou invalidante, consultez un médecin.
          </p>
        </div>
      </div>

      {/* CONTENU */}
      <section className="container mx-auto px-6 md:px-12 py-20 max-w-4xl">
        <div className="space-y-16">

          <Bloc titre="1. Objet">
            <p>
              Les présentes Conditions Générales d&apos;Utilisation (CGU) ont pour
              objet de définir les modalités et conditions d&apos;utilisation du
              site <strong>Dos Sans Douleur</strong> (ci-après &quot;le Site&quot;),
              accessible à l&apos;adresse{" "}
              <strong>https://dossansdouleur.com</strong>, ainsi que de définir
              les droits et obligations des utilisateurs dans ce cadre.
            </p>
            <p>
              L&apos;accès au Site implique l&apos;acceptation pleine et entière des
              présentes CGU. Si vous n&apos;acceptez pas ces conditions, veuillez
              ne pas utiliser le Site.
            </p>
          </Bloc>

          <Bloc titre="2. Nature du contenu">
            <p>
              Dos Sans Douleur est un <strong>blog informatif</strong> sur la
              santé vertébrale et la gestion des douleurs dorsales. Le contenu
              publié vise à :
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "Vulgariser des informations scientifiques sur le dos et la posture",
                "Présenter des exercices thérapeutiques à titre indicatif",
                "Partager des remèdes naturels et des conseils ergonomiques",
                "Informer sur les pathologies courantes (lombalgie, cervicalgie, hernie discale, etc.)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="mt-1.5 w-2 h-2 bg-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              <strong>Ce contenu ne constitue pas un acte médical</strong> et
              ne saurait remplacer un diagnostic, un traitement ou un suivi
              médical professionnel.
            </p>
          </Bloc>

          <Bloc titre="3. Limitation de responsabilité">
            <p>
              L&apos;éditeur du Site met tout en œuvre pour fournir des informations
              fiables et à jour, mais ne garantit pas l&apos;exhaustivité, l&apos;exactitude
              ou l&apos;adéquation du contenu à votre situation personnelle.
            </p>
            <div className="mt-6 bg-slate-900 text-white p-8">
              <p className="text-slate-300 leading-relaxed text-sm">
                En aucun cas, l&apos;éditeur du Site ne pourra être tenu responsable
                de tout dommage direct ou indirect résultant de l&apos;utilisation
                des informations publiées, notamment des exercices pratiqués
                sans avis médical préalable, ou de remèdes naturels appliqués
                sans consultation d&apos;un professionnel de santé.
              </p>
            </div>
          </Bloc>

          <Bloc titre="4. Propriété intellectuelle">
            <p>
              L&apos;ensemble du contenu du Site (textes, images, graphismes,
              structure, logo) est protégé par le droit d&apos;auteur et appartient
              à l&apos;éditeur ou à ses partenaires. Toute reproduction, même
              partielle, est interdite sans autorisation écrite préalable.
            </p>
            <p>
              Vous êtes autorisé à partager les liens vers les articles, sous
              réserve de mentionner clairement la source{" "}
              <strong>Dos Sans Douleur</strong> et d&apos;intégrer un lien vers la
              page originale.
            </p>
          </Bloc>

          <Bloc titre="5. Liens externes">
            <p>
              Le Site peut contenir des liens vers des sites tiers. Ces liens
              sont fournis à titre informatif. Dos Sans Douleur n&apos;exerce aucun
              contrôle sur ces sites et ne peut être tenu responsable de leur
              contenu ou de leurs pratiques en matière de données personnelles.
            </p>
            <p>
              Certains liens peuvent être des <strong>liens affiliés</strong>.
              Dans ce cas, nous percevons une commission si vous effectuez un
              achat, sans coût supplémentaire pour vous. Ces liens sont
              clairement identifiés sur le Site.
            </p>
          </Bloc>

          <Bloc titre="6. Comportement de l'utilisateur">
            <p>Il est interdit d&apos;utiliser le Site pour :</p>
            <ul className="mt-4 space-y-2">
              {[
                "Diffuser des contenus illicites, injurieux ou diffamatoires",
                "Tenter d'accéder sans autorisation aux systèmes informatiques",
                "Envoyer des messages non sollicités (spam)",
                "Copier ou reproduire le contenu sans autorisation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="mt-1.5 w-2 h-2 bg-red-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Bloc>

          <Bloc titre="7. Modification des CGU">
            <p>
              L&apos;éditeur se réserve le droit de modifier les présentes CGU à
              tout moment. Les modifications prennent effet dès leur publication
              sur le Site. La date de dernière mise à jour est indiquée en haut
              de cette page. Nous vous encourageons à consulter régulièrement
              cette page.
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
              cadres de protection des données personnelles les plus exigeants
              au monde.
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

          <Bloc titre="9. Droit applicable">
            <p>
              Les présentes CGU sont régies par le <strong>droit français</strong>.
              Tout litige relatif à leur interprétation ou à leur exécution
              relève de la compétence des tribunaux français.
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
              href="/mentions-legales"
              className="px-6 py-2 border border-black font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors"
            >
              Mentions légales
            </Link>
          </div>
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