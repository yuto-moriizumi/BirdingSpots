import { DYNAMODB_TABLE_NAME } from "@/constants";
import { model, Schema } from "dynamoose";
import { Item } from "dynamoose/dist/Item";

const spotSchema = new Schema({
  id: String,
  name: String,
  address: String,
  Jan: Number,
  Feb: Number,
  Mar: Number,
  Apr: Number,
  May: Number,
  Jun: Number,
  Jul: Number,
  Aug: Number,
  Sep: Number,
  Oct: Number,
  Nov: Number,
  Dec: Number,
});

interface SpotEntity extends Item {
  id: string;
  name: string;
  address: string;
  Jan: number;
  Feb: number;
  Mar: number;
  Apr: number;
  May: number;
  Jun: number;
  Jul: number;
  Aug: number;
  Sep: number;
  Oct: number;
  Nov: number;
  Dec: number;
}

export const SpotModel = model<SpotEntity>(DYNAMODB_TABLE_NAME, spotSchema);
