import { getSpotBirdsByPage } from "./getSpotBirdsByPage";

// 何ページ目まで取得するか
export const MAX_PAGE = 2;

/** 指定したスポットIDの野鳥情報をMAX_PAGE目まで取得する */
export async function getSpotBirds(id: string) {
  return Promise.all(
    [...new Array(MAX_PAGE)].map((_, i) => getSpotBirdsByPage(id, i + 1))
  ).then((arr) => arr.flat());
}
