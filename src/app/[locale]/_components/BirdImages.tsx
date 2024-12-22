"use client";

import { BIRDS_PER_SPOT } from "@/constants";
import { Link } from "@/i18n/routing";
import { Month } from "@/model/Month";
import { SpotBird } from "@/model/SpotBird";
import Image from "next/image";
import { useStoredTags } from "../_util/useStorage";

export function BirdImages({
  birds,
  currentMonth,
  monthPart,
}: {
  birds: SpotBird[];
  currentMonth: Month;
  monthPart: 0 | 1 | 2;
}) {
  const { tags } = useStoredTags();
  const idsToHide = tags.map((tag) => parseInt(tag.id));
  return (
    <div className="grid grid-cols-3 gap-2">
      {birds
        .filter((bird) => !idsToHide.includes(bird.id))
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
              {Math.floor(bird[`${currentMonth}Frequency`][monthPart] * 1000) /
                10}
              %
            </div>
          </Link>
        ))}
    </div>
  );
}
