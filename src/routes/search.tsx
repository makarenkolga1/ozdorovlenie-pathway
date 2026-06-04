import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { weeks, exercises } from "@/data/content";
import { Search as SearchIcon, ArrowRight, PlayCircle } from "lucide-react";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Поиск — Оздоровление" },
      { name: "description", content: "Поиск по теории и упражнениям курса «Оздоровление»." },
    ],
  }),
  component: SearchPage,
});

interface Hit {
  weekId: number;
  weekTitle: string;
  sectionId: string;
  sectionTitle: string;
  snippet: string;
}
interface VideoHit { label: string; url: string }

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function makeSnippet(text: string, q: string): string {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(q.toLowerCase());
  if (idx === -1) return text.slice(0, 180) + "…";
  const start = Math.max(0, idx - 70);
  const end = Math.min(text.length, idx + q.length + 110);
  return (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
}

function Highlight({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"));
  return (
    <>{parts.map((p, i) =>
      p.toLowerCase() === q.toLowerCase()
        ? <mark key={i} className="bg-accent/40 text-accent-foreground rounded px-0.5">{p}</mark>
        : <span key={i}>{p}</span>
    )}</>
  );
}

function SearchPage() {
  const [q, setQ] = useState("");
  const query = q.trim();

  const { theoryHits, videoHits } = useMemo(() => {
    if (query.length < 2) return { theoryHits: [] as Hit[], videoHits: [] as VideoHit[] };
    const lower = query.toLowerCase();
    const tHits: Hit[] = [];
    for (const w of weeks) {
      for (const s of w.sections) {
        const text = stripHtml(s.html);
        if (text.toLowerCase().includes(lower) || s.title.toLowerCase().includes(lower)) {
          tHits.push({
            weekId: w.id, weekTitle: w.title,
            sectionId: s.id, sectionTitle: s.title,
            snippet: makeSnippet(text, query),
          });
          if (tHits.length > 60) break;
        }
      }
    }
    const vHits = exercises.videos.filter(v => v.label.toLowerCase().includes(lower));
    return { theoryHits: tHits, videoHits: vHits };
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-14">
      <header>
        <span className="text-xs uppercase tracking-widest text-primary">Поиск</span>
        <h1 className="font-display text-4xl sm:text-5xl mt-3">Найдите тему за секунду</h1>
        <p className="text-muted-foreground mt-3">Ищем по всей теории и библиотеке упражнений курса.</p>
      </header>

      <div className="mt-8 relative">
        <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Например: лимфа, дыхание, коллаген…"
          className="w-full rounded-full border border-border bg-card pl-14 pr-5 py-4 text-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
      </div>

      {query.length >= 2 && (
        <div className="mt-3 text-sm text-muted-foreground">
          Найдено: <span className="text-foreground">{theoryHits.length}</span> в теории
          {videoHits.length > 0 && <>, <span className="text-foreground">{videoHits.length}</span> в видео</>}
        </div>
      )}

      {videoHits.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-xl mb-3">Видео</h2>
          <ul className="space-y-2">
            {videoHits.map((v, i) => (
              <li key={i}>
                <a href={v.url} target="_blank" rel="noopener noreferrer"
                   className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 hover:shadow-md hover:border-primary/30 transition">
                  <PlayCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-foreground/90"><Highlight text={v.label} q={query} /></span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-8 space-y-3">
        {query.length >= 2 && theoryHits.length === 0 && videoHits.length === 0 && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
            Ничего не нашлось. Попробуйте другое слово.
          </div>
        )}
        {theoryHits.length > 0 && <h2 className="font-display text-xl">Теория</h2>}
        {theoryHits.map((h, i) => (
          <Link
            key={i}
            to="/theory/$id"
            params={{ id: String(h.weekId) }}
            hash={h.sectionId}
            className="group block rounded-2xl border border-border bg-card p-5 hover:shadow-md hover:border-primary/30 transition"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs uppercase tracking-widest text-primary">
                Неделя {h.weekId} · {h.weekTitle}
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition" />
            </div>
            <div className="font-display text-lg mt-1"><Highlight text={h.sectionTitle} q={query} /></div>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              <Highlight text={h.snippet} q={query} />
            </p>
          </Link>
        ))}
      </section>

      {query.length < 2 && (
        <div className="mt-10 grid sm:grid-cols-2 gap-3 text-sm">
          {["лимфа","дыхание","коллаген","соль","сосуды","сон","кофе","кожа"].map((s) => (
            <button key={s} onClick={() => setQ(s)}
              className="text-left rounded-2xl border border-border bg-card p-4 hover:border-primary/30 hover:shadow-md transition">
              <span className="text-muted-foreground">Попробуйте:</span> <span className="text-primary">{s}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
