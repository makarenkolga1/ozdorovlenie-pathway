import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getWeek, weeks, type Week } from "@/data/content";
import { WeekIcon } from "@/components/WeekIcon";
import { ArrowLeft, ArrowRight, BookOpen, Sparkles } from "lucide-react";

export const Route = createFileRoute("/theory_/$id")({
  loader: ({ params }) => {
    const week = getWeek(Number(params.id));
    if (!week) throw notFound();
    return week;
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.title} — Оздоровление` },
      { name: "description", content: loaderData.summary.slice(0, 155) },
      { property: "og:title", content: `${loaderData.title} — Оздоровление` },
      { property: "og:description", content: loaderData.summary.slice(0, 155) },
      { property: "og:image", content: loaderData.image },
    ] : [],
  }),
  component: WeekPage,
  notFoundComponent: () => (
    <div className="max-w-2xl mx-auto px-5 py-24 text-center">
      <h1 className="font-display text-3xl">Раздел не найден</h1>
      <Link to="/theory" className="text-primary underline mt-4 inline-block">Все разделы</Link>
    </div>
  ),
});

function WeekPage() {
  const week = Route.useLoaderData() as Week;
  const prev = weeks.find((w) => w.id === week.id - 1);
  const next = weeks.find((w) => w.id === week.id + 1);

  return (
    <article className="pb-20">
      {/* Hero */}
      <header className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <img src={week.image} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </div>
        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 pt-16 pb-12">
          <Link to="/theory" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Все разделы
          </Link>
          <div className="mt-8 flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
              <WeekIcon name={week.icon} className="h-5 w-5" />
            </span>
            <span className="text-xs uppercase tracking-widest text-primary">{week.tagline}</span>
          </div>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl leading-tight">{week.title}</h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{week.summary}</p>

          <div className="mt-8 rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/10 to-primary/5 p-5 sm:p-6 flex items-start gap-4">
            <Sparkles className="h-5 w-5 text-accent-foreground shrink-0 mt-0.5" />
            <div>
              <div className="text-xs uppercase tracking-widest text-accent-foreground">Главное на этой неделе</div>
              <div className="font-display text-lg mt-1">{week.highlight}</div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1fr_220px] lg:gap-10">
        {/* TOC */}
        {week.sections.length > 1 && (
          <aside className="lg:order-2 lg:sticky lg:top-24 lg:self-start mb-8 lg:mb-0">
            <div className="rounded-2xl border border-border bg-card/70 backdrop-blur p-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-3">
                <BookOpen className="h-3.5 w-3.5" /> Содержание
              </div>
              <ol className="space-y-2 text-sm">
                {week.sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-foreground/80 hover:text-primary line-clamp-2 block">
                      <span className="text-primary mr-1">{i + 1}.</span> {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        )}

        <div className="lg:order-1 prose-wellness max-w-none">
          {week.sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="!mt-12 flex items-baseline gap-3">
                <span className="text-accent-foreground/70 font-display text-base">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              <div dangerouslySetInnerHTML={{ __html: s.html }} />
            </section>
          ))}
        </div>
      </div>

      {/* Navigation between weeks */}
      <nav className="max-w-3xl mx-auto px-5 sm:px-8 mt-16 grid sm:grid-cols-2 gap-4">
        {prev ? (
          <Link to="/theory_/$id" params={{ id: String(prev.id) }} className="group rounded-2xl border border-border bg-card p-5 hover:shadow-md transition">
            <div className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <ArrowLeft className="h-3.5 w-3.5" /> Предыдущая
            </div>
            <div className="font-display text-lg mt-1 group-hover:text-primary">{prev.title}</div>
          </Link>
        ) : <span />}
        {next ? (
          <Link to="/theory_/$id" params={{ id: String(next.id) }} className="group rounded-2xl border border-border bg-card p-5 hover:shadow-md transition sm:text-right">
            <div className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2 sm:justify-end">
              Следующая <ArrowRight className="h-3.5 w-3.5" />
            </div>
            <div className="font-display text-lg mt-1 group-hover:text-primary">{next.title}</div>
          </Link>
        ) : (
          <Link to="/exercises" className="group rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-accent/10 p-5 hover:shadow-md transition sm:text-right">
            <div className="text-xs uppercase tracking-widest text-primary flex items-center gap-2 sm:justify-end">
              Дальше <ArrowRight className="h-3.5 w-3.5" />
            </div>
            <div className="font-display text-lg mt-1">Библиотека упражнений</div>
          </Link>
        )}
      </nav>
    </article>
  );
}
