import { aws } from "dynamoose";
import { Spot } from "../model/Spot";
import { SpotModel } from "../model/SpotModel";
import { AWS_REGION } from "@/constants";

// DynamoDBの設定
const ddb = new aws.ddb.DynamoDB({
  region: AWS_REGION,
  credentials: {
    accessKeyId: process.env.DB_ACCESS_KEY_ID!,
    secretAccessKey: process.env.DB_SECRET_ACCESS_KEY!,
  },
});
aws.ddb.set(ddb);

export async function getBirdwatchingSpots(): Promise<Spot[]> {
  try {
    const spots = await SpotModel.scan().exec();
    if (spots.count === 0) {
      await new SpotModel({
        id: "1",
        name: "鳥見公園",
        address: "東京都新宿区西新宿1-1-1",
        Jan: 100,
        Feb: 120,
        Mar: 150,
        Apr: 200,
        May: 180,
        Jun: 210,
        Jul: 230,
        Aug: 250,
        Sep: 220,
        Oct: 190,
        Nov: 160,
        Dec: 140,
      }).save();
    }
    return spots as Spot[];
  } catch (error) {
    console.error("Error fetching data from DynamoDB:", error);
    throw error;
  }
}
