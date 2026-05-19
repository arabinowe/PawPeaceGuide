import Image from "next/image";

export type PetImageKey =
  | "dogOwner"
  | "catHome"
  | "puppy"
  | "kitten"
  | "dogSolo"
  | "calmTrust";

export const petImages: Record<PetImageKey, { src: string; alt: string }> = {
  dogOwner: {
    src: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1400&q=80",
    alt: "Happy golden retriever sitting with its owner at home"
  },
  catHome: {
    src: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1400&q=80",
    alt: "Happy orange cat looking up at home"
  },
  puppy: {
    src: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1400&q=80",
    alt: "Happy puppy outdoors in soft natural light"
  },
  kitten: {
    src: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?auto=format&fit=crop&w=1400&q=80",
    alt: "Happy kitten with a playful open-mouth expression"
  },
  dogSolo: {
    src: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1400&q=80",
    alt: "Happy dog running outside in natural light"
  },
  calmTrust: {
    src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1400&q=80",
    alt: "Two happy dogs sitting together outdoors"
  }
};

export function getPetImageForPath(pathOrSlug: string) {
  if (pathOrSlug.includes("start-60")) return petImages.dogSolo;
  if (pathOrSlug.includes("cat")) return petImages.catHome;
  if (pathOrSlug.includes("kitten")) return petImages.kitten;
  if (pathOrSlug.includes("puppy")) return petImages.puppy;
  if (pathOrSlug.includes("dog")) return petImages.dogOwner;
  if (
    pathOrSlug.includes("legal") ||
    pathOrSlug.includes("privacy") ||
    pathOrSlug.includes("terms") ||
    pathOrSlug.includes("disclosure") ||
    pathOrSlug.includes("disclaimer")
  ) {
    return petImages.calmTrust;
  }

  return petImages.dogOwner;
}

export function PetImagePanel({
  image = petImages.dogOwner,
  label,
  priority = false,
  unframed = false,
  aspectClass = "aspect-[4/3]",
  className = ""
}: {
  image?: { src: string; alt: string };
  label?: string;
  priority?: boolean;
  unframed?: boolean;
  aspectClass?: string;
  className?: string;
}) {
  const frameClass = unframed
    ? "overflow-hidden rounded-md bg-mist"
    : "overflow-hidden rounded-md border border-line bg-white shadow-soft";

  return (
    <div className={`${frameClass} ${className}`}>
      <div className={`relative ${aspectClass} bg-mist`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
          priority={priority}
        />
      </div>
      {label ? (
        <p className="border-t border-line bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-clay">
          {label}
        </p>
      ) : null}
    </div>
  );
}
