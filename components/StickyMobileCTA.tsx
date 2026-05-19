import { Button } from "@/components/Button";

type StickyMobileCtaProps = {
  href: string;
  label: string;
};

export function StickyMobileCTA({ href, label }: StickyMobileCtaProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 p-3 shadow-[0_-10px_28px_rgba(23,33,43,0.1)] backdrop-blur md:hidden">
      <Button href={href} className="w-full">
        {label}
      </Button>
    </div>
  );
}
