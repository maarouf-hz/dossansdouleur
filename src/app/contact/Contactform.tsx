"use client";

// app/contact/ContactForm.tsx — Client Component (formulaire interactif)
import Link from "next/link";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ nom: "", email: "", sujet: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="border-b-8 border-black pt-24 pb-12 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <nav className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">
            <Link href="/" className="hover:underline">
              Accueil
            </Link>{" "}
            / Contact
          </nav>
          <h1 className="text-6xl md:text-[10rem] font-black uppercase italic tracking-tighter leading-[0.8] mb-10">
            Contact
          </h1>
          <p className="max-w-2xl text-xl md:text-3xl font-medium text-slate-800 leading-tight italic border-l-8 border-emerald-500 pl-8">
            Une question, une correction ou une idée d&apos;article ? Écrivez-nous,
            nous lisons tous les messages.
          </p>
        </div>
      </header>

      {/* CONTENU */}
      <section className="container mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 max-w-6xl mx-auto">
          {/* Colonne infos */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-6 border-b-4 border-emerald-500 pb-2 inline-block">
                Pourquoi nous écrire ?
              </h2>
              <ul className="space-y-4 text-slate-700 font-medium">
                {[
                  "Signaler une erreur dans un article",
                  "Suggérer un sujet que vous aimeriez que nous traitions",
                  "Proposer une collaboration ou un partenariat",
                  "Nous poser une question générale sur le blog",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 bg-emerald-500 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900 text-white p-8">
              <p className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-3">
                ⚠️ Rappel important
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Nous ne sommes pas des professionnels de santé. Pour toute
                urgence médicale ou douleur sévère, consultez un médecin.
                Nous ne pouvons pas répondre à des demandes de diagnostic
                médical.
              </p>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                Temps de réponse habituel
              </p>
              <p className="text-3xl font-black text-emerald-600">48–72h</p>
              <p className="text-sm text-slate-500 mt-1">en jours ouvrés</p>
            </div>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-2">
            {status === "success" ? (
              <div className="border-l-8 border-emerald-500 bg-emerald-50 p-12">
                <p className="text-2xl font-black uppercase italic tracking-tighter text-emerald-700 mb-4">
                  Message envoyé !
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Merci pour votre message. Nous vous répondrons dans les
                  meilleurs délais (sous 48 à 72 heures en jours ouvrés).
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 px-6 py-2 border border-black font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                      Votre nom
                    </label>
                    <input
                      type="text"
                      name="nom"
                      required
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="Jean Dupont"
                      className="w-full border border-slate-300 px-4 py-3 font-medium text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                      Votre email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jean@exemple.fr"
                      className="w-full border border-slate-300 px-4 py-3 font-medium text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                    Sujet
                  </label>
                  <select
                    name="sujet"
                    required
                    value={formData.sujet}
                    onChange={handleChange}
                    className="w-full border border-slate-300 px-4 py-3 font-medium text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors bg-white"
                  >
                    <option value="">Sélectionnez un sujet...</option>
                    <option value="correction">Signaler une erreur</option>
                    <option value="suggestion">Suggérer un article</option>
                    <option value="partenariat">Partenariat / Collaboration</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                    Votre message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={7}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre demande en détail..."
                    className="w-full border border-slate-300 px-4 py-3 font-medium text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors bg-white resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-600 text-sm font-bold">
                    Une erreur est survenue. Veuillez réessayer.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-black text-white py-4 font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Envoi en cours..." : "Envoyer le message →"}
                </button>

                <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                  En soumettant ce formulaire, vous acceptez notre{" "}
                  <Link href="/politique-de-confidentialite" className="underline hover:text-emerald-600">
                    politique de confidentialité
                  </Link>
                  . Vos données ne seront jamais vendues ni partagées.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}