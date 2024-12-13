import { BirdwatchingSpot } from '../lib/getData';

interface BirdwatchingSpotsTableProps {
  spots: BirdwatchingSpot[];
  currentMonth: keyof BirdwatchingSpot;
}

export default function BirdwatchingSpotsTable({ spots, currentMonth }: BirdwatchingSpotsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">名前</th>
            <th className="py-3 px-6 text-left">住所</th>
            <th className="py-3 px-6 text-right">今月の閲覧数</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {spots.map((spot) => (
            <tr key={spot.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{spot.name}</td>
              <td className="py-3 px-6 text-left">{spot.address}</td>
              <td className="py-3 px-6 text-right">{spot[currentMonth as keyof BirdwatchingSpot]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

