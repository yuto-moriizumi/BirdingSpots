import BirdwatchingSpotsTable from "./_components/BirdwatchingSpotsTable";
import { getBirdwatchingSpots, Month } from "./getData";

export default async function Home() {
  const spots = await getBirdwatchingSpots();
  const currentMonth = new Date().toLocaleString("default", {
    month: "short",
  }) as Month;

  const sortedSpots = spots.sort((a, b) => {
    return b[currentMonth] - a[currentMonth];
  });

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">探鳥地一覧</h1>
      <BirdwatchingSpotsTable spots={sortedSpots} currentMonth={currentMonth} />
    </main>
  );
}
