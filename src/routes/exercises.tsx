import { createFileRoute } from "@tanstack/react-router";
import { exercises } from "@/data/content";
import exercisesImg from "@/assets/exercises.jpg";
import { PlayCircle, Dumbbell } from "lucide-react";

export const Route = createFileRoute("/exercises")({
  head: () => ({
    meta: [
      { title: "Упражнения — курс Оздоровление" },
      { name: "description", content: "Библиотека упражнений курса: простукивания, вибрационные прыжки, вытяжение, дыхание, видео." },
      { property: "og:title", content: "Упражнения курса Оздоровление" },
      { property: "og:description", content: "Полная библиотека практик с видео." },
    ],
  }),
  component: ExercisesPage,
});

function ExercisesPage() {
  return (
    <div className="pb-16">
      <header className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-10 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs uppercase tracking-widest">
              <Dumbbell className="h-3.5 w-3.5" /> практика
            </span>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl">Библиотека упражнений</h1>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Все практики курса в одном месте — в той же последовательности, что и в файле занятий.
              Сохранён авторский текст и ссылки на видео.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-primary/15 to-accent/15 blur-2xl" />
            <img src={exercisesImg} alt="Йога-коврик и инвентарь" loading="lazy" width={1600} height={900}
                 className="relative rounded-[1.8rem] shadow-xl object-cover w-full aspect-[16/10]" />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1fr_280px] gap-10">
        <div className="prose-wellness max-w-none rounded-3xl bg-card border border-border p-6 sm:p-10 shadow-sm">
          <div dangerouslySetInnerHTML={{ __html: exercises.html }} />
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
              <PlayCircle className="h-3.5 w-3.5" /> Видео ({exercises.videos.length})
            </div>
            <ol className="space-y-2 text-sm">
              {exercises.videos.map((v, i) => (
                <li key={i}>
                  <a href={v.url} target="_blank" rel="noopener noreferrer"
                     className="group flex items-start gap-2 rounded-lg p-2 -mx-2 hover:bg-secondary transition">
                    <PlayCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/80 group-hover:text-primary line-clamp-2">{v.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
