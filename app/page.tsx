import { getBirdwatchingSpots } from './lib/getData';
import BirdwatchingSpotsTable from './components/BirdwatchingSpotsTable';

export default async function Home() {
  const spots = await getBirdwatchingSpots();
  const currentMonth = new Date().toLocaleString('default', { month: 'short' });

  const sortedSpots = spots.sort((a, b) => {
    return b[currentMonth as keyof BirdwatchingSpot] - a[currentMonth as keyof BirdwatchingSpot];
  });

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">探鳥地一覧</h1>
      <BirdwatchingSpotsTable spots={sortedSpots} currentMonth={currentMonth} />
    </main>
  );
}

