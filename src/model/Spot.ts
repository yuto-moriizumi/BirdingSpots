import { MonthRecord } from "./MonthRecord";

export type Spot = MonthRecord & {
  id: string;
  name: string;
  address: string;
};
