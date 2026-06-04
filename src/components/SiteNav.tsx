import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Leaf, Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Главная" },
  { to: "/theory", label: "Теория" },
  { to: "/exercises", label: "Упражнения" },
  { to: "/search", label: "Поиск" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/15 transition">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="font-display text-lg tracking-tight">Оздоровление</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "bg-primary/10 text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
              className="px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary"
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border/60 px-5 py-3 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              activeProps={{ className: "bg-primary/10 text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
              className="px-4 py-3 rounded-xl text-sm text-muted-foreground hover:text-primary hover:bg-primary/5"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Leaf className="h-4 w-4 text-primary" />
          <span>Курс «Оздоровление» · мягкие практики каждый день</span>
        </div>
        <div>© {new Date().getFullYear()} Все материалы курса</div>
      </div>
    </footer>
  );
}
