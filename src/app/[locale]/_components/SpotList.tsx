"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Tag } from "emblor";
import { Spot } from "@/model/Spot";
import { Month } from "@/model/Month";
import { SpotCard } from "./SpotCard";
import Filter from "./Filter";
import { useStoredTags } from "../_util/useStorage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SpotListProps {
  spots: Spot[];
  currentMonth: Month;
  monthPart: 0 | 1 | 2;
  tableOptions: Tag[];
}

export default function SpotList({
  spots,
  currentMonth,
  monthPart,
  tableOptions,
}: SpotListProps) {
  const t = useTranslations("Home");
  const { tags } = useStoredTags();
  const [sortBy, setSortBy] = useState<string>("popularity");

  const idsToHide = tags.map((tag) => parseInt(tag.id));

  const sortedSpots = [...spots].sort((a, b) => {
    if (sortBy === "popularity") {
      return b[currentMonth] - a[currentMonth];
    } else {
      const n = parseInt(sortBy);

      const getNthBirdProb = (spot: Spot) => {
        const nonHiddenBirds = spot.birds
          .filter((bird) => !idsToHide.includes(bird.id))
          .sort(
            (x, y) =>
              y[`${currentMonth}Frequency`][monthPart] -
              x[`${currentMonth}Frequency`][monthPart]
          );
        const bird = nonHiddenBirds[n - 1];
        return bird ? bird[`${currentMonth}Frequency`][monthPart] : 0;
      };

      const probA = getNthBirdProb(a);
      const probB = getNthBirdProb(b);

      const probabilityDiff = probB - probA;

      return probabilityDiff === 0
        ? b[currentMonth] - a[currentMonth]
        : probabilityDiff;
    }
  });

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-4 mb-3">
        <h1 className="text-2xl font-bold">{t("list")}</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 whitespace-nowrap">
            {t("sortBy")}
          </span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder={t("sortBy")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">{t("popularity")}</SelectItem>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <SelectItem key={n} value={n.toString()}>
                  {t("nthBirdProbability", { n })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Filter options={tableOptions} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {sortedSpots.map((spot: Spot) => (
          <SpotCard
            key={spot.id}
            spot={spot}
            currentMonth={currentMonth}
            monthPart={monthPart}
          />
        ))}
      </div>
    </>
  );
}
