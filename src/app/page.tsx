import BirdwatchingSpotsTable from "./_components/BirdwatchingSpotsTable";
import { getBirdwatchingSpots } from "./_util/getData";
import { Month } from "../model/Month";
import Link from "next/link";
import { Button } from "./_components/Button";
import { getBirdSuggest } from "./_util/getBirdSuggest";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./_components/LocaleSwitcher";
import { BirdIcon } from "lucide-react";

export default async function Home() {
  const spots = await getBirdwatchingSpots();
  const currentMonth = new Date().toLocaleString("default", {
    month: "short",
  }) as Month;
  const monthPart = Math.floor((new Date().getDate() - 1) / 10) as 0 | 1 | 2;

  const sortedSpots = spots.sort((a, b) => {
    return b[currentMonth] - a[currentMonth];
  });

  return (
    <>
      <header className="flex items-center justify-end p-8 gap-2">
        <div className="flex items-center gap-2 mr-auto">
          <BirdIcon size={32} />
          <h1 className="text-2xl font-semibold">BirdingSpots</h1>
        </div>
        <AddSpotButton />
        <LocaleSwitcher />
      </header>
      <main className="container mx-auto px-3">
        <ListSectionTitle />
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

function AddSpotButton() {
  const t = useTranslations("Home");
  return (
    <Link href="/add">
      <Button variant="default">{t("add")}</Button>
    </Link>
  );
}

function ListSectionTitle() {
  const t = useTranslations("Home");
  return <h1 className="text-2xl font-bold mb-3">{t("list")}</h1>;
}
