import { createFileRoute, Link } from "@tanstack/react-router";
import { weeks } from "@/data/content";
import { WeekIcon } from "@/components/WeekIcon";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/theory")({
  head: () => ({
    meta: [
      { title: "Теория курса — Оздоровление" },
      { name: "description", content: "Пять разделов теории курса «Оздоровление»: системы тела, питание, кожа, лимфа, психика." },
      { property: "og:title", content: "Теория курса — Оздоровление" },
      { property: "og:description", content: "Пять разделов теории, оформленных как статьи-лонгриды." },
    ],
  }),
  component: TheoryPage,
});

function TheoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
      <header className="max-w-2xl">
        <span className="text-xs uppercase tracking-widest text-primary">Теория</span>
        <h1 className="font-display text-4xl sm:text-5xl mt-3">Пять разделов курса</h1>
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
          Откройте раздел и читайте как длинную статью: со встроенными подзаголовками,
          списками и важными цитатами.
        </p>
      </header>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {weeks.map((w, i) => (
          <article
            key={w.id}
            className="group rounded-3xl border border-border bg-card overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition fade-in"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="relative aspect-[5/3] overflow-hidden">
              <img src={w.image} alt={w.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <span className="absolute top-4 left-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/90 backdrop-blur text-primary shadow-sm">
                <WeekIcon name={w.icon} className="h-5 w-5" />
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="text-xs uppercase tracking-widest text-primary">{w.tagline}</div>
              <h2 className="font-display text-2xl mt-2 leading-tight">{w.title}</h2>
              <p className="text-sm text-muted-foreground mt-3 line-clamp-4 flex-1">{w.summary}</p>
              <Link
                to="/theory/$id"
                params={{ id: String(w.id) }}
                className="mt-5 inline-flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all"
              >
                Подробнее <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
