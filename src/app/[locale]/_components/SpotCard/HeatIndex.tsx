"use client";

import { useTranslations } from "next-intl";
import type { HeatIndex as HeatIndexValue } from "../../_util/getHeatIndexes";

const levelClassName: Record<string, string> = {
  // Yahoo! heatstroke levels: extremely_dangerous, dangerous, severe_alert,
  // alert, caution, safe.
  // Keep `danger` as an alias for compatibility with older API data.
  extremely_dangerous: "bg-[#928] text-white border-[#928]",
  dangerous: "bg-[#ed002f] text-white border-[#ed002f]",
  danger: "bg-[#ed002f] text-white border-[#ed002f]",
  severe_alert: "bg-[#ff9500] text-black border-[#ff9500]",
  alert: "bg-[#ffd400] text-black border-[#ffd400]",
  caution: "bg-[#88d856] text-black border-[#88d856]",
  safe: "bg-[#6dd1ec] text-black border-[#6dd1ec]",
};

export function HeatIndex({
  heatIndex,
  heatIndexDate,
}: {
  heatIndex: HeatIndexValue;
  heatIndexDate: string;
}) {
  const t = useTranslations("Home");
  const dateKey = heatIndexDate.replaceAll("-", "");
  const value = heatIndex.status === "ready" ? heatIndex.values[dateKey] : undefined;
  const displayState =
    heatIndex.status === "ready" && !value ? "empty" : heatIndex.status;
  const text =
    value
      ? t.has(`heatIndexLevels.${value}`)
        ? t(`heatIndexLevels.${value}`)
        : value
      : t(`heatIndexStates.${displayState}`);
  const className =
    value
      ? levelClassName[value] ??
        "bg-gray-100 text-gray-700 border-gray-200"
      : "bg-gray-50 text-gray-500 border-gray-200";

  return (
    <div className="mb-3 flex items-center justify-between gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm">
      <span className="text-gray-500">{t("heatIndex")}</span>
      <span
        className={`inline-flex min-h-6 items-center rounded-full border px-2 py-0.5 font-medium ${className}`}
      >
        {text}
      </span>
    </div>
  );
}
