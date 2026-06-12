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
  const videosWithLinks = exercises.videos.flatMap((video) => {
    const embedUrl = getYouTubeEmbedUrl(video.url);
    return embedUrl ? [{ ...video, embedUrl }] : [];
  });

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

      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-10">
        <div className="prose-wellness max-w-none rounded-3xl bg-card border border-border p-6 sm:p-10 shadow-sm">
          <div dangerouslySetInnerHTML={{ __html: exercises.html }} />
        </div>
        <section aria-labelledby="exercise-videos">
          <div className="mb-5 flex items-center gap-3">
            <PlayCircle className="h-6 w-6 text-primary" />
            <h2 id="exercise-videos" className="font-display text-3xl">Видео упражнений</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {videosWithLinks.map((video) => (
              <article key={`${video.label}-${video.url}`} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div className="aspect-video bg-muted">
                  <iframe
                    src={video.embedUrl}
                    title={video.label}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
                <h3 className="p-4 text-base font-medium leading-snug">{video.label}</h3>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function getYouTubeEmbedUrl(url: string) {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);
    const pathParts = parsedUrl.pathname.split("/").filter(Boolean);
    const videoId = parsedUrl.searchParams.get("v") ??
      (pathParts[0] === "shorts" || pathParts[0] === "embed" ? pathParts[1] : pathParts[0]);

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}
