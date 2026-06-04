import weeksData from "./weeks.json";
import exercisesData from "./exercises.json";
import week1Img from "@/assets/week1.jpg";
import week2Img from "@/assets/week2.jpg";
import week3Img from "@/assets/week3.jpg";
import week4Img from "@/assets/week4.jpg";
import week5Img from "@/assets/week5.jpg";

export interface Section {
  id: string;
  title: string;
  html: string;
}
export interface Week {
  id: number;
  title: string;
  icon: string;
  summary: string;
  sections: Section[];
  image: string;
  tagline: string;
  highlight: string;
}

const meta: Record<number, { tagline: string; highlight: string; image: string }> = {
  1: { tagline: "Неделя 1", highlight: "Поддержите сосуды и автономную нервную систему", image: week1Img },
  2: { tagline: "Неделя 2", highlight: "Питание соединительной ткани и микроэлементы", image: week2Img },
  3: { tagline: "Неделя 3", highlight: "Жиры, кожа и лимфатическая система", image: week3Img },
  4: { tagline: "Неделя 4", highlight: "Воспаление как путь к восстановлению", image: week4Img },
  5: { tagline: "Неделя 5", highlight: "Связь тела, психики и гормонов", image: week5Img },
};

export const weeks: Week[] = (weeksData as Week[]).map((w) => ({
  ...w,
  ...meta[w.id],
}));

export const getWeek = (id: number) => weeks.find((w) => w.id === id);

export interface ExerciseVideo {
  label: string;
  url: string;
}
export const exercises = exercisesData as { html: string; videos: ExerciseVideo[] };
