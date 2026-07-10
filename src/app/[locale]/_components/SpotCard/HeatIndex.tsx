"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Spot } from "@/model/Spot";

type HeatIndexState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "empty" }
  | { status: "ready"; value: string };

const levelClassName: Record<string, string> = {
  danger: "bg-red-100 text-red-800 border-red-200",
  severe_alert: "bg-orange-100 text-orange-800 border-orange-200",
  alert: "bg-yellow-100 text-yellow-800 border-yellow-200",
  caution: "bg-lime-100 text-lime-800 border-lime-200",
  safe: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

export function HeatIndex({
  spot,
  selectedDate,
}: {
  spot: Spot;
  selectedDate: string;
}) {
  const t = useTranslations("Home");
  const [state, setState] = useState<HeatIndexState>({ status: "loading" });

  useEffect(() => {
    if (!spot.heatIndexId) {
      return;
    }

    const controller = new AbortController();
    queueMicrotask(() => setState({ status: "loading" }));

    fetch(
      `https://7mm01bt4ii.execute-api.ap-northeast-1.amazonaws.com/${spot.heatIndexId}`,
      { signal: controller.signal }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Heat index API returned ${response.status}`);
        }
        return response.json() as Promise<Record<string, string>>;
      })
      .then((data) => {
        const value = data[selectedDate.replaceAll("-", "")];
        setState(value ? { status: "ready", value } : { status: "empty" });
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        console.error("Failed to fetch heat index:", error);
        setState({ status: "error" });
      });

    return () => controller.abort();
  }, [selectedDate, spot.heatIndexId]);

  const displayState = spot.heatIndexId ? state : { status: "disabled" as const };
  const text =
    displayState.status === "ready"
      ? t.has(`heatIndexLevels.${displayState.value}`)
        ? t(`heatIndexLevels.${displayState.value}`)
        : displayState.value
      : t(`heatIndexStates.${displayState.status}`);
  const className =
    displayState.status === "ready"
      ? levelClassName[displayState.value] ??
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
