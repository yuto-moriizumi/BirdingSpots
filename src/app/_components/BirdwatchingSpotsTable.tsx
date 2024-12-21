import { Month } from "@/model/Month";
import { Spot } from "../../model/Spot";
import { Edit2, Trash2 } from "lucide-react";
import { Card, CardHeader, CardContent } from "./Card";
import Image from "next/image";
import Link from "next/link";
import { BIRDS_PER_SPOT } from "@/constants";

interface BirdwatchingSpotsTableProps {
  spots: Spot[];
  currentMonth: Month;
  monthPart: 0 | 1 | 2;
}

export default function BirdwatchingSpotsTable({
  spots,
  currentMonth,
  monthPart,
}: BirdwatchingSpotsTableProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {spots.map((spot) => (
        <Card key={spot.id} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-semibold">
                  <Link href={`https://zoopicker.com/places/${spot.id}`}>
                    {spot.name}
                  </Link>
                </h2>
                <p className="text-sm text-gray-500">
                  今月の人気度: {spot[currentMonth]}
                </p>
              </div>
              <p className="text-sm text-gray-500">{spot.address}</p>
            </div>
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
              {spot.birds
                .sort(
                  (a, b) =>
                    b[`${currentMonth}Frequency`][monthPart] -
                    a[`${currentMonth}Frequency`][monthPart]
                )
                .slice(0, BIRDS_PER_SPOT)
                .map((bird, index) => (
                  <Link
                    key={index}
                    href={`https://zoopicker.com/animals/${bird.id}`}
                    className="relative aspect-square rounded-lg overflow-hidden group"
                  >
                    <Image
                      src={bird.imageUrl}
                      alt={bird.name}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
                      {/* なぜか丸め誤差が発生することがあるので切り捨てする */}
                      {Math.floor(
                        bird[`${currentMonth}Frequency`][monthPart] * 1000
                      ) / 10}
                      %
                    </div>
                  </Link>
                ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
