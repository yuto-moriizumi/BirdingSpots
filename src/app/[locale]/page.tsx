import { getBirdwatchingSpots } from "./_util/getBirdwatchingSpots";
import { Month } from "@/model/Month";
import { Button } from "@/components/ui/button";
import { Tag } from "emblor"; // Added: For Filter options type
import { getBirdSuggest } from "./_util/getBirdSuggest";
import LocaleSwitcher from "./_components/LocaleSwitcher";
import { BirdIcon } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { I18nPageProps } from "@/model/I18nPageProps";
import { BuildTime } from "./_components/BuildTime";
import SpotList from "./_components/SpotList";
import { getHeatIndexes } from "./_util/getHeatIndexes";

type MonthPart = 0 | 1 | 2;
type HomeProps = I18nPageProps;

function getTodayInJst() {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Tokyo",
  }).format(new Date());
}

export default async function Home({ params }: HomeProps) {
  // Enable static rendering
  setRequestLocale((await params).locale);
  const t = await getTranslations("Home");
  const buildTimeT = await getTranslations("BuildTime");

  const spots = await getBirdwatchingSpots();
  const heatIndexDate = getTodayInJst();
  const heatIndexes = await getHeatIndexes(spots);
  const currentMonth = new Date().toLocaleString("en-US", {
    month: "short",
  }) as Month;
  const monthPart = Math.min(
    Math.floor((new Date().getDate() - 1) / 10),
    2
  ) as MonthPart;

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
        <SpotList
          spots={spots}
          currentMonth={currentMonth}
          monthPart={monthPart}
          tableOptions={tableOptions}
          heatIndexDate={heatIndexDate}
          heatIndexes={heatIndexes}
        />
      </main>
    </>
  );
}

// 最後の生成から1分以後にアクセスされた場合は再生成する
export const revalidate = 60;
