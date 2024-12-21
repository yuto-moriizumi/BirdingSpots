import { MonthRecord } from "./MonthRecord";

export type Spot = MonthRecord & {
  id: string;
  name: string;
  address: string;
  birds: {
    name: string;
    JanFrequency: number[];
    FebFrequency: number[];
    MarFrequency: number[];
    AprFrequency: number[];
    MayFrequency: number[];
    JunFrequency: number[];
    JulFrequency: number[];
    AugFrequency: number[];
    SepFrequency: number[];
    OctFrequency: number[];
    NovFrequency: number[];
    DecFrequency: number[];
  }[];
};
