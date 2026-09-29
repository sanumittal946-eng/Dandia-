import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, ChevronDown, Instagram, MapPin, Menu, Play, Sparkles, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { festival } from "@/lib/festival-data";
import { BookingButton, Reveal, SectionHeading } from "./Shared";
import { MusicPlayer } from "./MusicPlayer";

const nav = [{ label: "Experience", target: "experience" }, { label: "Music", target: "music" }, { label: "9 Nights", target: "nights" }, { label: "Passes", target: "passes" }, { label: "Gallery", target: "gallery" }, { label: "Venue", target: "venue" }, { label: "FAQ", target: "faq" }];
const go = (target: string) => document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });

export function FestivalPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [activeNight, setActiveNight] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeReel, setActiveReel] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const unavailable = () => { setNotice("Booking link is unavailable. Please contact the organizers."); window.setTimeout(() => setNotice(""), 4500); };
  const social = () => { if (festival.instagramUrl) window.open(festival.instagramUrl, "_blank", "noopener,noreferrer"); else { setNotice("The official Instagram link is coming soon."); window.setTimeout(() => setNotice(""), 4500); } };
  const night = festival.nights[activeNight] ?? festival.nights[0];
  const selectedReel = activeReel === null ? null : festival.reels[activeReel];

  if (!night) return null;

  return <main className="overflow-x-clip">
    <header className="fixed inset-x-0 top-0 z-50 border-b border-foreground/15 bg-background/65 backdrop-blur-xl">
      <div className="section-wrap grid h-17 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:h-20 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <div className="flex items-center gap-3">
          <a href="#top" className="group flex items-center gap-2.5 sm:gap-3" aria-label="Kalpam Events presents Dandiya Night">
            <div className="relative flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-white p-1 shadow-md ring-1 ring-border/60 transition-transform duration-300 group-hover:scale-105">
              <img src={festival.organizerLogo} alt={festival.organizer} className="size-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-accent leading-none">
                Kalpam Events
              </span>
              <span className="font-display text-lg sm:text-2xl leading-tight text-foreground">
                {festival.brand}<span className="text-primary">.</span>
              </span>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-border/80">
            <a href={festival.organizerInstagram} target="_blank" rel="noopener noreferrer" title={`Follow ${festival.organizer} on Instagram (${festival.organizerHandle})`} className="transition-transform hover:scale-110">
              <img src={festival.organizerLogo} alt={festival.organizer} className="h-6 w-6 rounded bg-white p-0.5 object-contain shadow-sm" />
            </a>
            <a href={festival.outreachPartnerInstagram} target="_blank" rel="noopener noreferrer" title={`Follow ${festival.outreachPartner} on Instagram (${festival.outreachPartnerHandle})`} className="transition-transform hover:scale-110">
              <img src={festival.outreachPartnerLogo} alt={festival.outreachPartner} className="h-6 w-6 rounded bg-black border border-white/20 p-0.5 object-contain shadow-sm" />
            </a>
          </div>
        </div>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">{nav.map(item => <a className="text-[11px] font-bold uppercase text-foreground/75 transition-colors hover:text-primary" key={item.target} href={`#${item.target}`}>{item.label}</a>)}</nav>
        <div className="hidden justify-end lg:flex"><BookingButton url={festival.bookingUrl} onUnavailable={unavailable} className="h-10 px-5">GET PASSES</BookingButton></div>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </div>
      {menuOpen && (
        <nav aria-label="Mobile navigation" className="border-t border-border bg-background px-6 py-6 lg:hidden">
          <div className="flex items-center gap-3 pb-4 mb-3 border-b border-border">
            <img src={festival.organizerLogo} alt={festival.organizer} className="size-10 rounded-xl bg-white p-1 object-contain shadow-md" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-accent">Kalpam Events Presents</div>
              <div className="font-display text-xl text-foreground">{festival.brand}</div>
            </div>
          </div>
          {nav.map(item => (
            <a key={item.target} href={`#${item.target}`} onClick={() => setMenuOpen(false)} className="display-title block border-b border-border py-3 text-3xl">
              {item.label}
            </a>
          ))}
          <div className="mt-5 flex items-center justify-between">
            <a href={festival.organizerInstagram} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-accent flex items-center gap-1">
              Follow {festival.organizerHandle} <ArrowUpRight className="size-3" />
            </a>
            <BookingButton url={festival.bookingUrl} onUnavailable={unavailable} className="h-9 px-4 text-xs">
              GET PASSES
            </BookingButton>
          </div>
        </nav>
      )}
    </header>

    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden bg-background pt-20">
      <img src={festival.images.hero} alt="Garba dancers celebrating beneath red stage lights in Jaipur" width={1536} height={1024} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[56%_center]" />
      <div className="hero-shade absolute inset-0" /><div className="texture pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} className="particle-float absolute h-1 w-1 rounded-full bg-accent/80" style={{ left: `${8 + (i * 67) % 88}%`, top: `${18 + (i * 41) % 68}%`, animationDelay: `${i * .37}s` }} />)}</div>
      <div className="section-wrap relative z-10 pb-24 pt-12 md:pb-16">
        <motion.div initial={reduced ? false : { opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
          <div className="mb-8 flex flex-wrap items-center gap-2.5 sm:gap-3">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/60 bg-background/70 py-1.5 pl-2 pr-4 text-xs font-bold uppercase tracking-wider text-accent backdrop-blur-md shadow-lg shadow-black/20 ring-1 ring-accent/20">
              <img src={festival.organizerLogo} alt={festival.organizer} className="size-6 rounded-full bg-white p-0.5 object-contain shadow-xs" />
              <span>Kalpam Events Presents</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-foreground/80 backdrop-blur-sm">
              <Sparkles className="size-3 text-primary" /> NAVRATRI 2026 <span className="opacity-40">/</span> JAIPUR
            </div>
          </div>
          <h1 className="display-title max-w-[1000px] text-[clamp(4.5rem,12vw,12rem)] text-foreground">THE GREAT INDIAN<br /><span className="text-primary">DANDIYA NIGHT</span><span className="text-accent">.</span></h1>
          <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={festival.organizerInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 rounded-xl border border-accent/40 bg-background/70 px-3.5 py-1.5 backdrop-blur-md transition-all hover:border-primary hover:bg-background/90"
            >
              <img src={festival.organizerLogo} alt={festival.organizer} className="h-9 w-9 rounded-lg bg-white object-contain p-1 shadow" />
              <div>
                <span className="block text-[9px] font-bold uppercase tracking-wider text-accent">ORGANIZED BY</span>
                <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                  {festival.organizer} <span className="text-[10px] font-normal text-muted-foreground">{festival.organizerHandle}</span> <ArrowUpRight className="size-3 opacity-60" />
                </span>
              </div>
            </a>
            <a
              href={festival.outreachPartnerInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 rounded-xl border border-accent/40 bg-background/70 px-3.5 py-1.5 backdrop-blur-md transition-all hover:border-primary hover:bg-background/90"
            >
              <img src={festival.outreachPartnerLogo} alt={festival.outreachPartner} className="h-9 w-9 rounded-lg bg-black border border-white/20 object-contain p-1 shadow" />
              <div>
                <span className="block text-[9px] font-bold uppercase tracking-wider text-accent">OUTREACH PARTNER</span>
                <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                  {festival.outreachPartner} <span className="text-[10px] font-normal text-muted-foreground">{festival.outreachPartnerHandle}</span> <ArrowUpRight className="size-3 opacity-60" />
                </span>
              </div>
            </a>
          </div>
          <p className="mt-7 text-sm font-bold uppercase text-foreground md:text-lg">9 NIGHTS. ONE VIBE. INFINITE MEMORIES.</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase text-foreground/75"><span className="flex items-center gap-2"><CalendarDays className="size-4 text-accent" />{festival.dates} · {festival.openingTime}</span><span className="flex items-center gap-2"><MapPin className="size-4 text-accent" />{festival.venue} · {festival.city}</span></div>
          <div className="mt-9 flex flex-wrap gap-3"><BookingButton url={festival.bookingUrl} onUnavailable={unavailable}>GET PASSES</BookingButton><Button variant="festivalOutline" size="festival" onClick={() => go("music")}><Play className="size-4" /> PLAY THE VIBE</Button></div>
        </motion.div>
      </div>
      <a href="#music" aria-label="Scroll to music" className="absolute bottom-8 right-6 z-10 flex items-center gap-3 text-[10px] font-bold uppercase text-foreground md:right-12"><span className="hidden md:inline">SCROLL TO FEEL IT</span><ArrowDown className="size-5 animate-bounce" /></a>
      <div className="absolute bottom-0 left-0 z-10 h-1 w-1/3 bg-primary glow-line" />
    </section>

    <div className="overflow-hidden border-y border-border bg-primary py-3 text-primary-foreground"><div className="marquee-track flex w-max gap-8 whitespace-nowrap font-display text-lg uppercase md:text-2xl">{Array.from({ length: 8 }, (_, i) => <span key={i}>JAIPUR, THIS IS YOUR MOMENT <span className="mx-8 text-accent">✦</span> 9 NIGHTS. ONE VIBE.</span>)}</div></div>

    <MusicPlayer />

    <section id="experience" className="scroll-mt-20 py-24 md:py-36"><div className="section-wrap"><SectionHeading eyebrow="03 / THE EXPERIENCE" title="MORE THAN" accent="A FESTIVAL.">A little tradition. A lot of electricity. Every corner has a story waiting to happen.</SectionHeading>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">{([
        ["GARBA", "Circle up. Turn up.", festival.images.dance, "01"], ["DANDIYA", "Every beat. Every stick. Every moment.", festival.images.crowd, "02"], ["LIVE DJ", "Desi beats meet modern bass.", festival.images.dj, "03"], ["LIGHTS", "Where the night comes alive.", festival.images.lights, "04"], ["FOOD", "Festive flavours all night.", festival.images.food, "05"], ["MEMORIES", "Moments worth posting.", festival.images.hero, "06"],
      ] satisfies [string, string, string, string][]).map(([title, text, image, number], i) => <Reveal key={title} delay={Math.min(i % 3 * .08, .16)} className="group relative aspect-[.75] overflow-hidden bg-card md:aspect-[.88]"><img src={image} alt={`${title.toLowerCase()} at a Navratri festival`} width={1024} height={1280} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" /><div className="absolute left-4 top-4 text-xs font-bold text-accent md:left-6 md:top-6">/{number}</div><div className="absolute bottom-5 left-4 right-3 md:bottom-7 md:left-7"><h3 className="display-title text-3xl md:text-5xl lg:text-6xl">{title}</h3><p className="mt-2 text-xs text-foreground/80 md:text-sm">{text}</p></div></Reveal>)}</div>
    </div></section>

    <section id="nights" className="scroll-mt-20 border-y border-border bg-panel py-24 md:py-36"><div className="section-wrap"><SectionHeading eyebrow="04 / THE DATES" title="9 NIGHTS." accent="ONE BIG CELEBRATION.">{festival.dates} at {festival.venue}. Night-specific themes and artists have not been announced.</SectionHeading>
      <div className="flex gap-2 overflow-x-auto pb-5 [scrollbar-width:thin]">{festival.nights.map((item, i) => <Button key={item.number} variant="ghost" aria-label={`Select night ${item.number}`} aria-pressed={activeNight === i} onClick={() => setActiveNight(i)} className={`h-20 min-w-22 shrink-0 flex-col rounded-none border px-4 py-3 text-left transition-colors md:h-24 md:min-w-29 ${activeNight === i ? "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "border-border text-foreground hover:border-accent hover:bg-accent hover:text-accent-foreground"}`}><span className="display-title text-3xl md:text-4xl">{item.number}</span><span className="text-[10px] font-bold">{item.date}</span></Button>)}</div>
      <div className="mt-6 grid overflow-hidden border border-border md:grid-cols-[1fr_1.2fr]"><div className="relative min-h-[320px] overflow-hidden"><img src={activeNight % 3 === 0 ? festival.images.dance : activeNight % 3 === 1 ? festival.images.dj : festival.images.crowd} alt="Navratri dancers and music under festival lighting" width={1024} height={1280} loading="lazy" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" /><div className="absolute bottom-5 left-6 display-title text-8xl text-foreground/70">{night.number}</div></div><div className="flex flex-col justify-between p-7 md:p-12"><div><div className="mb-5 text-xs font-bold uppercase text-accent">NIGHT {night.number} / {night.date} 2026</div><h3 className="display-title text-5xl md:text-7xl">{night.theme}</h3><p className="mt-4 text-muted-foreground">{night.attraction}</p></div><div className="mt-10"><div className="grid grid-cols-2 gap-5 border-t border-border py-5 text-sm"><div><span className="block text-[10px] font-bold uppercase text-muted-foreground">ON THE DECKS</span><strong>{night.artist}</strong></div><div><span className="block text-[10px] font-bold uppercase text-muted-foreground">LOCATION</span><strong>{night.venue}</strong></div></div><BookingButton url={night.bookingUrl} onUnavailable={unavailable}>GET PASS</BookingButton></div></div></div>
    </div></section>

    <section id="passes" className="scroll-mt-20 py-24 md:py-36">
      <div className="section-wrap">
        <SectionHeading eyebrow="05 / THE ACCESS" title="YOUR PASS" accent="TO THE VIBE.">
          Official early bird rates starting from {festival.ticketPrice}. Valid for single-day entry (7 PM onwards) with full arena, live DJ, and Dandiya celebration access.
        </SectionHeading>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {festival.passes.map((pass, i) => (
            <Reveal
              key={pass.name}
              delay={i * 0.05}
              className="clip-ticket flex min-h-[440px] flex-col border border-accent/80 bg-card p-5 text-card-foreground transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="mb-6 flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <img src={festival.organizerLogo} alt={festival.organizer} className="size-5 rounded bg-white p-0.5 object-contain shadow-xs" />
                  <span className="text-accent tracking-wider">{pass.tag || "OFFICIAL TICKET"}</span>
                </div>
                <Sparkles className="size-4 text-primary" />
              </div>
              <h3 className="display-title text-2xl leading-tight min-h-[3.25rem]">{pass.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{pass.description}</p>
              <p className="mt-5 font-display text-5xl text-foreground">{pass.price}</p>
              <div className="my-5 border-t border-dashed border-current opacity-30" />
              <ul className="mb-6 space-y-2.5 text-xs font-semibold">
                {pass.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <span className="text-primary shrink-0">✦</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <BookingButton url={pass.bookingUrl} onUnavailable={unavailable} className="w-full text-xs">
                  BOOK NOW
                </BookingButton>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold uppercase text-muted-foreground">
          <span>* You can add up to 10 tickets per transaction on BookMyShow.</span>
          <span>Early bird rates valid for limited period.</span>
        </p>
      </div>
    </section>

    <section id="social" className="border-y border-border bg-panel py-24 md:py-36"><div className="section-wrap"><SectionHeading eyebrow="06 / THE FEED" title="JAIPUR IS" accent="ALREADY VIBING.">A taste of the energy. Real festival moments start when you show up.</SectionHeading><div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">{festival.reels.map((reel, i) => <Reveal key={reel.caption} delay={i * .06} className="group relative aspect-[9/16] overflow-hidden bg-card"><img src={reel.image} alt={reel.caption} width={1024} height={1280} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-background/20" /><div className="absolute left-4 top-4 flex items-center gap-1 text-xs font-bold"><Instagram className="size-4" /> {reel.views}</div><Button variant="festivalIcon" size="festivalIcon" aria-label={`View ${reel.caption}`} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-foreground/25 backdrop-blur" onClick={() => setActiveReel(i)}><Play fill="currentColor" /></Button><p className="absolute bottom-5 left-4 right-4 text-xs font-bold md:text-sm">{reel.caption}</p></Reveal>)}</div><div className="mt-9 flex flex-wrap gap-3"><Button asChild variant="festivalOutline" size="festival"><a href={festival.organizerInstagram} target="_blank" rel="noopener noreferrer"><Instagram className="size-4" /> FOLLOW {festival.organizerHandle} <ArrowUpRight /></a></Button><Button asChild variant="festivalOutline" size="festival"><a href={festival.outreachPartnerInstagram} target="_blank" rel="noopener noreferrer"><Instagram className="size-4" /> FOLLOW {festival.outreachPartnerHandle} <ArrowUpRight /></a></Button></div></div></section>

    <section id="gallery" className="scroll-mt-20 py-24 md:py-36"><div className="section-wrap"><SectionHeading eyebrow="07 / THE MOMENTS" title="FEEL IT" accent="BEFORE YOU'RE THERE." /><div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">{[
      [festival.images.crowd, "A dandiya circle in full swing", "md:row-span-2"], [festival.images.dj, "DJ bringing the energy", ""], [festival.images.food, "Festival street food with friends", ""], [festival.images.lights, "Lights over the dancefloor", "md:row-span-2"], [festival.images.dance, "Garba dancers in festive outfits", ""], [festival.images.hero, "Crowd dancing beneath stage lights", ""],
    ].map(([image, alt, extra], i) => <Reveal key={i} className={`group min-h-48 overflow-hidden bg-card md:min-h-72 ${extra}`}><img src={image} alt={alt} width={1024} height={1280} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></Reveal>)}</div></div></section>

    <section id="venue" className="scroll-mt-20 border-y border-border bg-panel py-24 md:py-36">
      <div className="section-wrap">
        <SectionHeading eyebrow="08 / FIND US" title="WHERE THE" accent="VIBE HAPPENS.">
          Conveniently located in Jaipur at Entertainment Paradise. Join thousands of festival-goers under the stars.
        </SectionHeading>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.3fr] lg:gap-14 items-stretch">
          <Reveal className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold uppercase text-accent">
                <MapPin className="size-3.5" /> JAIPUR, RAJASTHAN
              </div>
              <h3 className="display-title mt-4 text-5xl md:text-7xl">{festival.venue}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{festival.address}</p>

              <div className="mt-8 grid gap-4 border-y border-border py-6 text-sm sm:grid-cols-2">
                <div className="rounded-lg border border-border/60 bg-background/50 p-3.5">
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-accent">DATES</span>
                  <strong className="text-foreground">{festival.dates}</strong>
                </div>
                <div className="rounded-lg border border-border/60 bg-background/50 p-3.5">
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-accent">START TIME</span>
                  <strong className="text-foreground">{festival.openingTime}</strong>
                </div>
                <div className="rounded-lg border border-border/60 bg-background/50 p-3.5">
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-accent">PARKING</span>
                  <strong className="text-foreground">{festival.parking}</strong>
                </div>
                <div className="rounded-lg border border-border/60 bg-background/50 p-3.5">
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-accent">ENTRY</span>
                  <strong className="text-foreground">{festival.entry}</strong>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">General queries:</span>
                {festival.contactNumbers.map((number, i) => (
                  <span key={number}>
                    {i > 0 && " · "}
                    <a className="font-bold text-foreground underline decoration-accent/60 underline-offset-4 hover:text-primary transition-colors" href={`tel:+91${number.replace(/\s/g, "")}`}>
                      +91 {number}
                    </a>
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="festivalOutline" size="festival">
                <a href={festival.mapsUrl ?? "https://maps.google.com/?q=Entertainment+Paradise+Jaipur"} target="_blank" rel="noopener noreferrer">
                  <MapPin className="size-4" /> OPEN IN GOOGLE MAPS <ArrowUpRight className="size-4" />
                </a>
              </Button>
              <BookingButton url={festival.bookingUrl} onUnavailable={unavailable}>
                GET PASSES
              </BookingButton>
            </div>
          </Reveal>

          <Reveal className="overflow-hidden rounded-2xl border border-accent/40 bg-card shadow-2xl shadow-black/40 flex flex-col min-h-[420px] md:min-h-[480px]">
            <div className="flex items-center justify-between border-b border-border bg-panel/90 px-4 py-3 backdrop-blur">
              <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                <span className="size-2 rounded-full bg-primary animate-pulse" />
                <span>{festival.venue} · Live Map</span>
              </div>
              <a
                href={festival.mapsUrl ?? "https://maps.google.com/?q=Entertainment+Paradise+Jaipur"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-accent hover:text-primary transition-colors"
              >
                Directions <ArrowUpRight className="size-3" />
              </a>
            </div>
            <div className="relative flex-1 w-full min-h-[360px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5331.065457167885!2d75.79311974891529!3d26.83493657164815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dcb6487461483%3A0x7702a39b617948a8!2sEntertainment%20Paradise!5e0!3m2!1sen!2sin!4v1790664122964!5m2!1sen!2sin"
                title="Entertainment Paradise, Jaipur Location Map"
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <section id="faq" className="scroll-mt-20 py-24 md:py-36"><div className="section-wrap grid gap-10 md:grid-cols-[.75fr_1.25fr] md:gap-20"><SectionHeading eyebrow="09 / GOOD TO KNOW" title="QUESTIONS?" accent="WE GOT YOU." /><div>{festival.faqs.map((faq, i) => <div key={faq.question} className="border-b border-border"><Button variant="ghost" onClick={() => setActiveFaq(activeFaq === i ? null : i)} aria-expanded={activeFaq === i} className="flex h-auto min-h-18 w-full justify-between gap-5 rounded-none px-0 py-5 text-left text-sm font-bold hover:bg-transparent hover:text-primary md:text-base"><span>{faq.question}</span><ChevronDown className={`size-5 shrink-0 transition-transform ${activeFaq === i ? "rotate-180" : ""}`} /></Button>{activeFaq === i && <p className="pb-6 pr-10 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>}</div>)}</div></div></section>

    <section className="relative flex min-h-[85svh] items-center overflow-hidden py-28"><img src={festival.images.hero} alt="Garba dancers celebrating at a night festival" width={1536} height={1024} loading="lazy" className="absolute inset-0 h-full w-full object-cover" /><div className="final-shade absolute inset-0" /><div className="texture pointer-events-none absolute inset-0 opacity-30" /><div className="section-wrap relative"><Reveal><div className="mb-5 text-xs font-bold uppercase text-accent">THIS IS YOUR SIGN</div><p className="display-title text-4xl md:text-7xl">DON'T JUST WATCH NAVRATRI.</p><h2 className="display-title mt-3 text-[clamp(7rem,23vw,23rem)] text-primary">LIVE IT<span className="text-accent">.</span></h2><p className="mt-5 text-sm font-bold uppercase md:text-lg">9 nights. One city. Zero regrets.</p><div className="mt-9 flex flex-wrap gap-3"><BookingButton url={festival.bookingUrl} onUnavailable={unavailable}>GET YOUR PASS</BookingButton><Button variant="festivalOutline" size="festival" onClick={social}>FOLLOW US <ArrowRight /></Button></div></Reveal></div></section>

    <footer className="border-t border-border bg-background pb-26 pt-12 md:pb-12">
      <div className="section-wrap flex flex-col gap-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-8">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-accent mb-3">OFFICIAL PARTNERS</div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={festival.organizerInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-border bg-panel px-4 py-2 transition-all hover:border-primary hover:bg-card"
              >
                <img src={festival.organizerLogo} alt={festival.organizer} className="h-10 w-10 rounded-lg bg-white p-1 object-contain shadow-sm" />
                <div>
                  <span className="block text-[9px] font-bold uppercase text-muted-foreground">ORGANIZER</span>
                  <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                    {festival.organizer} <span className="text-xs font-normal text-muted-foreground">{festival.organizerHandle}</span> <ArrowUpRight className="size-3 opacity-60" />
                  </span>
                </div>
              </a>
              <a
                href={festival.outreachPartnerInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-border bg-panel px-4 py-2 transition-all hover:border-primary hover:bg-card"
              >
                <img src={festival.outreachPartnerLogo} alt={festival.outreachPartner} className="h-10 w-10 rounded-lg bg-black border border-white/20 p-1 object-contain shadow-sm" />
                <div>
                  <span className="block text-[9px] font-bold uppercase text-muted-foreground">OUTREACH PARTNER</span>
                  <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                    {festival.outreachPartner} <span className="text-xs font-normal text-muted-foreground">{festival.outreachPartnerHandle}</span> <ArrowUpRight className="size-3 opacity-60" />
                  </span>
                </div>
              </a>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Official presentation for Season 2.0 · Entertainment Paradise, Jaipur
          </div>
        </div>
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-white p-1 shadow-md ring-1 ring-border/50">
                <img src={festival.organizerLogo} alt={festival.organizer} className="size-full object-contain" />
              </div>
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-accent leading-none">
                  Presented by Kalpam Events
                </div>
                <div className="font-display text-3xl sm:text-4xl leading-tight">
                  {festival.brand}<span className="text-primary">.</span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">JAIPUR · NAVRATRI 2026 · MADE FOR THE MOMENT</p>
          </div>
          <div className="flex flex-wrap gap-5 text-xs font-bold uppercase">{nav.map(item => <a key={item.target} href={`#${item.target}`} className="hover:text-primary">{item.label}</a>)}</div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/80 pt-6 text-xs text-muted-foreground sm:flex-row">
          <div>© {festival.year} {festival.brand}. All rights reserved.</div>
          <div className="font-medium tracking-wide">
            Made By <span className="font-bold text-foreground transition-colors hover:text-primary">{festival.madeBy}</span>
          </div>
        </div>
      </div>
    </footer>

    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden"><BookingButton url={festival.bookingUrl} onUnavailable={unavailable} className="w-full">GET PASSES</BookingButton></div>
    {notice && <div role="status" className="fixed bottom-23 left-1/2 z-[70] w-[min(90vw,420px)] -translate-x-1/2 border border-accent bg-background p-4 text-center text-sm shadow-xl lg:bottom-6">{notice}<Button variant="ghost" size="icon" aria-label="Dismiss notification" className="absolute right-1 top-1" onClick={() => setNotice("")}><X className="size-3" /></Button></div>}
    {selectedReel && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-background/95 p-5" role="dialog" aria-modal="true" aria-label="Festival photo preview" onClick={() => setActiveReel(null)}><div className="relative h-[min(85vh,780px)] aspect-[9/16] max-w-full overflow-hidden" onClick={e => e.stopPropagation()}><img src={selectedReel.image} alt={selectedReel.caption} width={1024} height={1280} className="h-full w-full object-cover" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background p-6 pt-20 text-sm font-bold">{selectedReel.caption}<p className="mt-2 text-xs font-normal">Festival preview image · Video coming soon</p></div><Button variant="festivalIcon" size="icon" className="absolute right-3 top-3" aria-label="Close preview" onClick={() => setActiveReel(null)}><X /></Button></div></div>}
  </main>;
}