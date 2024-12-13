import { Month } from "./Month";

export type MonthRecord = {
  [month in Month]: number;
};
