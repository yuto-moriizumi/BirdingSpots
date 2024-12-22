import BirdwatchingSpotsTable from "./_components/BirdwatchingSpotsTable";
import { getBirdwatchingSpots } from "./_util/getData";
import { Month } from "../model/Month";
import Link from "next/link";
import { Button } from "./_components/Button";
import { getBirdSuggest } from "./_util/getBirdSuggest";

export default async function Home() {
  const spots = await getBirdwatchingSpots();
  const currentMonth = new Date().toLocaleString("default", {
    month: "short",
  }) as Month;
  const monthPart = Math.floor((new Date().getDate() - 1) / 10) as 0 | 1 | 2;

  const sortedSpots = spots.sort((a, b) => {
    return b[currentMonth] - a[currentMonth];
  });

  return (
    <>
      <header className="flex items-center justify-between mb-6 p-8">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-emerald-500"
          >
            <path d="M16 8v8" />
            <path d="M8 9.5v5" />
            <path d="M12 6v10" />
            <path d="M2 2a4 4 0 0 1 4 4v9.5a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4V6a4 4 0 0 1 4-4" />
          </svg>
          <h1 className="text-2xl font-semibold">BirdingSpots</h1>
        </div>
        <Link href="/add">
          <Button variant="default">探鳥地を追加</Button>
        </Link>
      </header>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">探鳥地一覧</h1>
        <BirdwatchingSpotsTable
          spots={sortedSpots}
          currentMonth={currentMonth}
          monthPart={monthPart}
          options={(await getBirdSuggest("")).map((bird) => ({
            id: bird.id.toString(),
            text: bird.name,
          }))}
        />
      </main>
    </>
  );
}
