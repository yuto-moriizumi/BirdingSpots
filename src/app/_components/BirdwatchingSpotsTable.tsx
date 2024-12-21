import { Month } from "@/model/Month";
import { Spot } from "../../model/Spot";
import { Edit2, Trash2 } from "lucide-react";
import { Card, CardHeader, CardContent } from "./Card";

interface BirdwatchingSpotsTableProps {
  spots: Spot[];
  currentMonth: Month;
}

export default function BirdwatchingSpotsTable({
  spots,
  currentMonth,
}: BirdwatchingSpotsTableProps) {
  console.log({ spots });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {spots.map((spot) => (
        <Card key={spot.id} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <h2 className="text-lg font-semibold">{spot.name}</h2>
            <div className="flex gap-2">
              <button className="text-gray-500 hover:text-gray-700">
                <Edit2 className="w-4 h-4" />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {spot.birds.slice(0, 3).map((bird, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden group"
                >
                  <img
                    src={`/globe.svg?height=200&width=200`}
                    alt={bird.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
                    {Math.round(bird[`${currentMonth}Frequency`][0])}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
