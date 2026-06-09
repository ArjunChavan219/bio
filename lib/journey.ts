export type Waypoint = {
  id: string;
  label: string;
  place: string;
  year: string;
  pos: [number, number, number];
  tone: "visited" | "open";
};

// The journey. Same line, two meanings: a migration path and a signal route.
// Visited stops glow violet; the unfinished arc toward "the coast" glows amber.
export const journey: Waypoint[] = [
  { id: "mumbai", label: "Mumbai", place: "origin", year: "—", pos: [-5.4, 0.2, -0.6], tone: "visited" },
  { id: "baltimore", label: "Baltimore", place: "Johns Hopkins", year: "’24", pos: [-1.8, 1.9, 0.3], tone: "visited" },
  { id: "tysons", label: "Tysons", place: "Strategy", year: "now", pos: [1.6, 1.3, -0.3], tone: "visited" },
  { id: "coast", label: "the coast", place: "next", year: "?", pos: [5.0, 2.7, 0.5], tone: "open" },
];
