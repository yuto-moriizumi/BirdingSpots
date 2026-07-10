import { Card, CardContent } from "@/components/ui/card";
import { Spot } from "@/model/Spot";
import { Month } from "@/model/Month";
import { SpotCardHeader } from "./SpotCardHeader";
import { BirdImages } from "../BirdImages";
import { HeatIndex } from "./HeatIndex";

interface Props {
  spot: Spot;
  currentMonth: Month;
  monthPart: 0 | 1 | 2;
  heatIndexDate: string;
}

export function SpotCard({
  spot,
  currentMonth,
  monthPart,
  heatIndexDate,
}: Props) {
  return (
    <Card className="overflow-hidden">
      <SpotCardHeader spot={spot} currentMonth={currentMonth} />
      <CardContent>
        <HeatIndex spot={spot} selectedDate={heatIndexDate} />
        <BirdImages
          birds={spot.birds}
          currentMonth={currentMonth}
          monthPart={monthPart}
        />
      </CardContent>
    </Card>
  );
}
