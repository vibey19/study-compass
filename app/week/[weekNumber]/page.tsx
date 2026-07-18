import { notFound } from "next/navigation";
import { roadmap } from "@/data/curriculum";
import { WeekView } from "@/components/week-view";

export const dynamicParams = false;

export function generateStaticParams() {
  return roadmap.map((w) => ({ weekNumber: String(w.week) }));
}

export default async function WeekPage({
  params,
}: {
  params: Promise<{ weekNumber: string }>;
}) {
  const { weekNumber } = await params;
  const week = Number(weekNumber);
  if (!roadmap.some((w) => w.week === week)) notFound();
  return <WeekView week={week} />;
}
