import { Spot } from "@/model/Spot";

const HEAT_INDEX_API_URL =
  "https://7mm01bt4ii.execute-api.ap-northeast-1.amazonaws.com";

export type HeatIndex =
  | { status: "disabled" }
  | { status: "error" }
  | { status: "empty" }
  | { status: "ready"; values: Record<string, string> };

function isHeatIndexId(value: string): boolean {
  return /^\d+\/\d+\/\d+$/.test(value);
}

/** Fetches all heat-index values on the server for the selected date. */
export async function getHeatIndexes(
  spots: Spot[]
): Promise<Record<string, HeatIndex>> {
  const entries = await Promise.all(
    spots.map(async (spot): Promise<[string, HeatIndex]> => {
      if (!spot.heatIndexId) return [spot.id, { status: "disabled" }];
      if (!isHeatIndexId(spot.heatIndexId)) return [spot.id, { status: "error" }];

      try {
        const response = await fetch(
          `${HEAT_INDEX_API_URL}/${spot.heatIndexId}`,
          { cache: "no-store" }
        );
        if (!response.ok) return [spot.id, { status: "error" }];

        const data: unknown = await response.json();
        if (!data || typeof data !== "object") return [spot.id, { status: "empty" }];
        const values = Object.fromEntries(
          Object.entries(data as Record<string, unknown>).filter(
            ([date, value]) => /^\d{8}$/.test(date) && typeof value === "string" && value
          )
        ) as Record<string, string>;
        return [spot.id, Object.keys(values).length ? { status: "ready", values } : { status: "empty" }];
      } catch (error) {
        console.error(`Failed to fetch heat index for spot ${spot.id}:`, error);
        return [spot.id, { status: "error" }];
      }
    })
  );

  return Object.fromEntries(entries);
}
