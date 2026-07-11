"use client";

import { useTranslations } from "next-intl";
import type { HeatIndex as HeatIndexValue } from "../../_util/getHeatIndexes";

const levelClassName: Record<string, string> = {
  danger: "bg-red-100 text-red-800 border-red-200",
  severe_alert: "bg-orange-100 text-orange-800 border-orange-200",
  alert: "bg-yellow-100 text-yellow-800 border-yellow-200",
  caution: "bg-lime-100 text-lime-800 border-lime-200",
  safe: "bg-emerald-100 text-emerald-800 border-emerald-200",
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
