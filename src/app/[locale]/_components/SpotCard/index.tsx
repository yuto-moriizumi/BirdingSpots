import { Card, CardContent } from "@/components/ui/card";
import { Spot } from "@/model/Spot";
import { Month } from "@/model/Month";
import { SpotCardHeader } from "./SpotCardHeader";
import { BirdImages } from "../BirdImages";

interface Props {
  spot: Spot;
  currentMonth: Month;
  monthPart: 0 | 1 | 2;
}

export function SpotCard({ spot, currentMonth, monthPart }: Props) {
  return (
    <Card className="overflow-hidden">
      <SpotCardHeader spot={spot} currentMonth={currentMonth} />
      <CardContent>
        <BirdImages
          birds={spot.birds}
          currentMonth={currentMonth}
          monthPart={monthPart}
        />
      </CardContent>
    </Card>
  );
}
