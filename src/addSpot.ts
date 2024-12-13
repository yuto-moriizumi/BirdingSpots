"use server";

import { Spot } from "./model/Spot";
import { SpotModel } from "./model/SpotModel";

export const addSpot = async (spotData: Spot) => {
  try {
    await new SpotModel(spotData).save();
    return true;
  } catch (error) {
    console.error("Error adding spot:", error);
    return false;
  }
};
