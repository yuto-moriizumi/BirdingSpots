import { Month } from "@/model/Month";
import { Spot } from "../../../model/Spot";
import { Edit2, Trash2 } from "lucide-react";
import { Card, CardHeader, CardContent } from "./Card";
import Filter from "./Filter";
import { Tag } from "emblor";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { BirdImages } from "./BirdImages";

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
  const t = useTranslations("Home");
  return (
    <>
      <Filter options={options} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {spots.map((spot) => (
          <Card key={spot.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <div>
                <div className="flex items-center flex-wrap gap-x-2">
                  <h2 className="text-lg font-semibold">
                    <Link href={`https://zoopicker.com/places/${spot.id}`}>
                      {spot.name}
                    </Link>
                  </h2>
                  <p className="text-sm text-gray-500">
                    {t("popularity")}: {spot[currentMonth]}
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
