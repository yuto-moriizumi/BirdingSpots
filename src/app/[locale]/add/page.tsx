import { getTranslations, setRequestLocale } from "next-intl/server";
import { I18nPageProps } from "@/model/I18nPageProps";
import { AddSpotForm } from "./_components/AddSpotForm";
import { Link } from "@/i18n/routing";

export default async function AddSpotPage({ params }: I18nPageProps) {
  // Enable static rendering
  setRequestLocale((await params).locale);
  const t = await getTranslations("AddSpotPage");
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <Link href="/">{t("goBack")}</Link>
      <h1 className="text-2xl font-bold mb-5">{t("title")}</h1>
      <AddSpotForm />
    </div>
  );
}
