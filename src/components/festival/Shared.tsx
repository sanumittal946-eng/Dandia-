import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }} transition={{ duration: .65, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

export function SectionHeading({ eyebrow, title, accent, children }: { eyebrow: string; title: string; accent?: string; children?: ReactNode }) {
  return <Reveal className="mb-10 md:mb-16">
    <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase text-accent"><span className="h-px w-8 bg-accent" />{eyebrow}</div>
    <h2 className="display-title max-w-5xl text-[clamp(3.4rem,8vw,8.5rem)]">{title} {accent && <span className="text-primary">{accent}</span>}</h2>
    {children && <div className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">{children}</div>}
  </Reveal>;
}

export function BookingButton({ url, children, variant = "festival", className = "", onUnavailable }: { url: string | null; children: ReactNode; variant?: "festival" | "festivalOutline"; className?: string; onUnavailable: () => void }) {
  if (url) return <Button asChild variant={variant} size="festival" className={className}><a href={url} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight /></a></Button>;
  return <Button variant={variant} size="festival" className={className} onClick={onUnavailable}>{children}<ArrowUpRight /></Button>;
}