import { Activity, Leaf, Droplets, Flame, Heart, type LucideIcon } from "lucide-react";

const map: Record<string, LucideIcon> = {
  activity: Activity,
  leaf: Leaf,
  droplets: Droplets,
  flame: Flame,
  heart: Heart,
};

export function WeekIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? Leaf;
  return <Icon className={className} />;
}
