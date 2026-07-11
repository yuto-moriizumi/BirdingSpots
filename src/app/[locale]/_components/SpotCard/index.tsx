import { Card, CardContent } from "@/components/ui/card";
import { Spot } from "@/model/Spot";
import { Month } from "@/model/Month";
import { SpotCardHeader } from "./SpotCardHeader";
import { BirdImages } from "../BirdImages";
import { HeatIndex } from "./HeatIndex";
import type { HeatIndex as HeatIndexValue } from "../../_util/getHeatIndexes";

interface Props {
  spot: Spot;
  currentMonth: Month;
  monthPart: 0 | 1 | 2;
  heatIndex: HeatIndexValue;
  heatIndexDate: string;
}

export function SpotCard({
  spot,
  currentMonth,
  monthPart,
  heatIndex,
  heatIndexDate,
}: Props) {
  return (
    <Card className="overflow-hidden">
      <SpotCardHeader spot={spot} currentMonth={currentMonth} />
      <CardContent>
        <HeatIndex heatIndex={heatIndex} heatIndexDate={heatIndexDate} />
        <BirdImages
          birds={spot.birds}
          currentMonth={currentMonth}
          monthPart={monthPart}
        />
      </CardContent>
    </Card>
  );
}
