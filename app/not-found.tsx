import { Button } from "@/components/Button";
import { PetImagePanel, petImages } from "@/components/PetImage";

export default function NotFound() {
  return (
    <section className="mx-auto grid max-w-5xl gap-8 px-5 py-16 md:grid-cols-[1fr_0.85fr] md:items-center md:py-24">
      <div className="text-center md:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">Page not found</p>
        <h1 className="mt-4 text-4xl font-semibold text-ink">This page is not part of the guide.</h1>
        <p className="mt-4 text-lg text-muted">
          Head back to the main pet insurance education funnel or compare quote options.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
          <Button href="/pet-insurance">Start the guide</Button>
          <Button href="/compare" variant="secondary">
            Compare quote options
          </Button>
        </div>
      </div>
      <PetImagePanel image={petImages.dogOwner} label="Back to calm pet insurance guidance" priority />
    </section>
  );
}
