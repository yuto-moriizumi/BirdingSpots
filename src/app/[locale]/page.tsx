import BirdwatchingSpotsTable from "./_components/BirdwatchingSpotsTable";
import { getBirdwatchingSpots } from "./_util/getData";
import { Month } from "@/model/Month";
import { Button } from "./_components/Button";
import { getBirdSuggest } from "./_util/getBirdSuggest";
import LocaleSwitcher from "./_components/LocaleSwitcher";
import { BirdIcon } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { I18nPageProps } from "@/model/I18nPageProps";

type MonthPart = 0 | 1 | 2;
export default async function Home({ params }: I18nPageProps) {
  // Enable static rendering
  setRequestLocale((await params).locale);
  const t = await getTranslations("Home");

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

  return (
    <>
      <header className="container mx-auto flex p-3">
        <div className="flex gap-2">
          <BirdIcon size={32} />
          <h1 className="text-2xl font-semibold">BirdingSpots</h1>
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
        <BirdwatchingSpotsTable
          spots={sortedSpots}
          currentMonth={currentMonth}
          monthPart={monthPart}
          options={(await getBirdSuggest("")).map((bird) => ({
            id: bird.id.toString(),
            text: bird.name,
          }))}
        />
      </main>
    </>
  );
}

// 最後の生成から1分以後にアクセスされた場合は再生成する
export const revalidate = 10;
