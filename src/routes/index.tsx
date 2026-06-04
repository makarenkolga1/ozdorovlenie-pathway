import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { weeks } from "@/data/content";
import { WeekIcon } from "@/components/WeekIcon";
import { ArrowRight, Sparkles, PlayCircle, Search } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Оздоровление — мягкий курс восстановления тела" },
      { name: "description", content: "Пятинедельный курс «Оздоровление»: теория и упражнения о сосудах, тканях, питании, лимфе и эмоциях." },
      { property: "og:title", content: "Оздоровление — мягкий курс восстановления" },
      { property: "og:description", content: "Пять недель практик в спокойном темпе." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5" /> авторский курс
            </span>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl leading-[1.05] text-foreground">
              Возвращение к телу — <span className="text-primary italic">мягко и системно</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              «Оздоровление» — пятинедельный путь о сосудах, соединительной ткани, лимфе, питании и
              эмоциях. Маленькие ежедневные практики, которые складываются в большое изменение.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/theory" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 hover:opacity-90 transition shadow-sm">
                Начать с теории <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/exercises" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 hover:bg-secondary transition">
                <PlayCircle className="h-4 w-4 text-primary" /> Библиотека упражнений
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div><div className="font-display text-2xl text-foreground">5</div>недель</div>
              <div className="h-8 w-px bg-border" />
              <div><div className="font-display text-2xl text-foreground">{weeks.reduce((n,w)=>n+w.sections.length,0)}+</div>тем</div>
              <div className="h-8 w-px bg-border" />
              <div><div className="font-display text-2xl text-foreground">16</div>видео</div>
            </div>
          </div>
          <div className="relative fade-in">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-primary/15 via-transparent to-accent/20 blur-2xl" />
            <img
              src={heroImg}
              alt="Эвкалипт на льняной ткани"
              width={1600} height={1024}
              className="relative rounded-[2rem] shadow-xl object-cover w-full aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* Weeks preview */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <h2 className="font-display text-3xl">Пять недель — пять опор</h2>
            <p className="text-muted-foreground mt-2">Каждая неделя — новая система тела и новые мягкие практики.</p>
          </div>
          <Link to="/theory" className="text-primary hover:underline inline-flex items-center gap-1">
            Все разделы <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {weeks.slice(0, 3).map((w) => (
            <Link
              key={w.id}
              to="/theory/$id"
              params={{ id: String(w.id) }}
              className="group rounded-3xl border border-border bg-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="aspect-[5/3] overflow-hidden">
                <img src={w.image} alt={w.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-widest text-primary">{w.tagline}</div>
                <h3 className="font-display text-xl mt-2">{w.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{w.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Search teaser */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-16">
        <Link
          to="/search"
          className="block rounded-3xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-border p-8 sm:p-12 hover:shadow-lg transition"
        >
          <div className="flex items-center gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Search className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-2xl">Найдите ответ за секунду</h2>
              <p className="text-muted-foreground mt-1">Поиск по всем темам, упражнениям и неделям курса.</p>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
