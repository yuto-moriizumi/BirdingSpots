import { Month } from "@/model/Month";
import { Spot } from "../../../model/Spot";
import { Card, CardContent } from "./Card";
import Filter from "./Filter";
import { Tag } from "emblor";
import { BirdImages } from "./BirdImages";
import { SpotCardHeader } from "./SpotCardHeader";

interface Props {
  spots: Spot[];
  currentMonth: Month;
  monthPart: 0 | 1 | 2;
  options: Tag[];
}

export default function BirdwatchingSpotsTable({
  spots,
  currentMonth,
  monthPart,
  options,
}: Props) {
  return (
    <>
      <Filter options={options} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {spots.map((spot) => (
          <Card key={spot.id} className="overflow-hidden">
            <SpotCardHeader spot={spot} currentMonth={currentMonth} />
            <CardContent>
              <BirdImages
                birds={spot.birds}
                currentMonth={currentMonth}
                monthPart={monthPart}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
