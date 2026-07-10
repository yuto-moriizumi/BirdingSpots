import { MonthRecord } from "./MonthRecord";
import { SpotBird } from "./SpotBird";

export type Spot = MonthRecord & {
  id: string;
  name: string;
  address: string;
  heatIndexId: string | null;
  updatedAt: Date;
  birds: SpotBird[];
};
