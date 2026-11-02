import { MonthRecord } from "@/model/MonthRecord";
import { MONTH } from "@/model/Month";
import { JSDOM } from "jsdom";

export type SpotPageInfo = {
  name: string;
  address: string;
  monthlyCounts: MonthRecord;
};

/** 探鳥地ページから名前・住所・月毎の累計観察数を取得する */
export async function getSpotPageInfo(id: string): Promise<SpotPageInfo> {
  const response = await fetch(`https://zoopicker.com/places/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch place page: ${response.status}`);
  }
  const raw = await response.text();
  const data = raw.replace(/calc\([^)]*NaN%[^)]*\)/g, "0%");
  const dom = new JSDOM(data);
  const document = dom.window.document;
  const name = document.querySelector("h1")?.textContent?.trim() || "";
  const address =
    document.querySelector("article > div.mb-s")?.textContent?.trim() || "";
  const monthlyCounts = getMonthlyCounts(document);
  if (!monthlyCounts) {
    throw new Error("Monthly observation counts not found");
  }
  return { name, address, monthlyCounts };
}

/**
 * 「月毎の累計観察数」の表から 1月〜12月 の件数を取り出す。
 * 以前は canvas で描画されたグラフだったが、HTML の表に変わった。
 * 表が見つからない、または12ヶ月分そろっていない場合は null を返す。
 */
function getMonthlyCounts(document: Document): MonthRecord | null {
  const monthlyCounts = Object.fromEntries(
    MONTH.map((month) => [month, 0])
  ) as MonthRecord;

  const charts = Array.from(
    document.querySelectorAll<HTMLElement>(".html-bar-chart")
  );
  const chart =
    charts.find((element) =>
      Array.from(element.querySelectorAll("th")).some((th) =>
        /^\d{1,2}月$/.test(th.textContent?.trim() ?? "")
      )
    ) ?? charts[0];
  if (!chart) return null;

  let found = 0;
  chart.querySelectorAll("tr").forEach((row) => {
    const monthMatch = row
      .querySelector("th")
      ?.textContent?.trim()
      .match(/^(\d{1,2})月$/);
    if (!monthMatch) return;

    const month = MONTH[Number(monthMatch[1]) - 1];
    if (!month) return;

    // 値は html-bar-chart__value 内の span に入っている
    const valueText =
      row.querySelector(".html-bar-chart__value span")?.textContent ??
      row.querySelector("td")?.textContent ??
      "";
    const value = Number.parseInt(valueText.replace(/[^\d]/g, ""), 10);
    if (Number.isFinite(value)) {
      monthlyCounts[month] = value;
      found++;
    }
  });

  return found === MONTH.length ? monthlyCounts : null;
}
