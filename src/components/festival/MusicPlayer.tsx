import { useEffect, useRef, useState } from "react";
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { festival } from "@/lib/festival-data";
import { Reveal, SectionHeading } from "./Shared";

function time(value: number) { return Number.isFinite(value) ? `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, "0")}` : "0:00"; }

export function MusicPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(16);
  const [muted, setMuted] = useState(false);
  const track = festival.tracks[index] ?? festival.tracks[0];

  useEffect(() => {
    const el = audio.current;
    if (!el) return;
    el.load();
    setPosition(0);
    if (playing) el.play().catch(() => setPlaying(false));
  }, [index]);

  const toggle = () => {
    const el = audio.current;
    if (!el) return;
    if (playing) { el.pause(); setPlaying(false); }
    else el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };
  const change = (direction: number) => setIndex(current => (current + direction + festival.tracks.length) % festival.tracks.length);

  if (!track) return null;
  return <section id="music" className="scroll-mt-20 border-t border-border bg-panel py-24 md:py-36">
    <div className="section-wrap">
      <SectionHeading eyebrow="02 / SOUNDTRACK" title="TURN UP" accent="THE GARBA." />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <Reveal className="relative aspect-square max-h-[600px] overflow-hidden bg-card">
          <img src={track.art} alt={`${track.title} artwork`} width={1024} height={1280} loading="lazy" className={`h-full w-full object-cover transition-transform duration-1000 ${playing ? "scale-110" : "scale-100"}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
          <div className="absolute left-6 top-6 border border-foreground/50 bg-background/50 px-3 py-2 text-[10px] font-bold uppercase tracking-widest backdrop-blur">NOW SPINNING / 0{index + 1}</div>
          <div className="absolute bottom-7 left-7 right-7 flex h-10 items-end gap-1" aria-hidden="true">{Array.from({ length: 32 }, (_, i) => <span key={i} className={`w-full bg-accent ${playing ? "waveform-bar" : ""}`} style={{ height: `${20 + ((i * 37) % 76)}%`, animationDelay: `${(i % 7) * .11}s` }} />)}</div>
        </Reveal>
        <Reveal className="flex flex-col justify-between" delay={.1}>
          <div>
            <div className="mb-4 text-xs font-bold uppercase text-accent">THE OFFICIAL FESTIVAL PLAYLIST</div>
            <h3 className="display-title text-6xl md:text-8xl">{track.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{track.artist} · Official festival track</p>
            <audio ref={audio} src={track.src} preload="metadata" muted={muted} onTimeUpdate={e => setPosition(e.currentTarget.currentTime)} onLoadedMetadata={e => setDuration(e.currentTarget.duration)} onEnded={() => change(1)} />
            <div className="mt-10 flex items-center gap-5">
              <Button variant="ghost" size="icon" aria-label="Previous track" title="Previous track" onClick={() => change(-1)}><SkipBack className="size-5" /></Button>
              <Button variant="festivalIcon" size="festivalIcon" aria-label={playing ? "Pause" : "Play"} title={playing ? "Pause" : "Play"} onClick={toggle}>{playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</Button>
              <Button variant="ghost" size="icon" aria-label="Next track" title="Next track" onClick={() => change(1)}><SkipForward className="size-5" /></Button>
              <span className="ml-auto text-xs tabular-nums text-muted-foreground">{time(position)} / {time(duration)}</span>
              <Button variant="ghost" size="icon" aria-label={muted ? "Unmute" : "Mute"} title={muted ? "Unmute" : "Mute"} onClick={() => setMuted(!muted)}>{muted ? <VolumeX /> : <Volume2 />}</Button>
            </div>
            <input aria-label="Track progress" type="range" min="0" max={duration || 16} step="0.1" value={position} onChange={e => { const next = Number(e.target.value); if (audio.current) audio.current.currentTime = next; setPosition(next); }} className="mt-6 w-full cursor-pointer accent-primary" />
          </div>
          <div className="mt-12 border-t border-border">
            {festival.tracks.map((item, i) => <Button key={item.title} variant="ghost" className={`flex h-auto w-full justify-between rounded-none border-b border-border px-0 py-4 text-left hover:bg-transparent ${i === index ? "text-primary" : "text-foreground hover:text-primary"}`} onClick={() => { if (i === index) toggle(); else setIndex(i); }}><span className="flex items-center gap-5"><span className="text-xs text-muted-foreground">0{i + 1}</span><span className="font-bold uppercase">{item.title}</span></span>{i === index && playing ? <span className="text-[10px] uppercase">PLAYING</span> : <Play className="size-3" />}</Button>)}
          </div>
        </Reveal>
      </div>
    </div>
  </section>;
}