import { getBirdwatchingSpots } from "./_util/getBirdwatchingSpots";
import { Month } from "@/model/Month";
import { Spot } from "../../model/Spot"; // Added: For spot type in map
import { Button } from "@/components/ui/button";
import Filter from "./_components/Filter"; // Added: From BirdwatchingSpotsTable
import { Tag } from "emblor"; // Added: For Filter options type
import { SpotCard } from "./_components/SpotCard"; // Added: New SpotCard component
import { getBirdSuggest } from "./_util/getBirdSuggest";
import LocaleSwitcher from "./_components/LocaleSwitcher";
import { BirdIcon } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { I18nPageProps } from "@/model/I18nPageProps";
import { BuildTime } from "./_components/BuildTime";

type MonthPart = 0 | 1 | 2;
export default async function Home({ params }: I18nPageProps) {
  // Enable static rendering
  setRequestLocale((await params).locale);
  const t = await getTranslations("Home");
  const buildTimeT = await getTranslations("BuildTime");

  const spots = await getBirdwatchingSpots();
  const currentMonth = new Date().toLocaleString("en-US", {
    month: "short",
  }) as Month;
  const monthPart = Math.min(
    Math.floor((new Date().getDate() - 1) / 10),
    2
  ) as MonthPart;

  const sortedSpots = spots.sort((a, b) => {
    return b[currentMonth] - a[currentMonth];
  });

  const tableOptions: Tag[] = (await getBirdSuggest("")).map((bird) => ({
    // Define options for the table, explicitly typed
    id: bird.id.toString(),
    text: bird.name,
  }));

  return (
    <>
      <header className="container mx-auto flex p-3">
        <div className="flex gap-2 items-center">
          <BirdIcon size={32} />
          <h1 className="text-2xl font-semibold">BirdingSpots</h1>
          <BuildTime buildTimeLabel={buildTimeT("buildTime")} />
        </div>
        <div className="flex gap-2 flex-wrap flex-grow justify-end">
          <Link href="/add">
            <Button variant="default">{t("add")}</Button>
          </Link>
          <LocaleSwitcher />
        </div>
      </header>
      <main className="container mx-auto px-3">
        <h1 className="text-2xl font-bold mb-3">{t("list")}</h1>
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
      </main>
    </>
  );
}

// 最後の生成から1分以後にアクセスされた場合は再生成する
export const revalidate = 10;
