import Image from "next/image";

interface HeroImageContentProps {
  imageUrl: string | null | undefined;
  alt: string | null | undefined;
  showBadge?: boolean;
}

export function HeroImageContent({
  imageUrl,
  alt,
  showBadge = false,
}: HeroImageContentProps) {
  if (!imageUrl) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest italic">
        Image à la Une
      </div>
    );
  }

  return (
    <>
      <Image
        src={imageUrl}
        alt={alt ?? "Image à la Une"}
        fill
        priority
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      {showBadge && (
        <span className="absolute bottom-4 right-4 bg-emerald-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1">
          Voir le produit →
        </span>
      )}
    </>
  );
}