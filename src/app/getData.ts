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
  // 仮のデータを返す
  // return [
  //   {
  //     id: "1",
  //     name: "鳥見公園",
  //     address: "東京都新宿区西新宿1-1-1",
  //     Jan: 100,
  //     Feb: 120,
  //     Mar: 150,
  //     Apr: 200,
  //     May: 180,
  //     Jun: 210,
  //     Jul: 230,
  //     Aug: 250,
  //     Sep: 220,
  //     Oct: 190,
  //     Nov: 160,
  //     Dec: 140,
  //   },
  //   {
  //     id: "2",
  //     name: "野鳥の森",
  //     address: "大阪府大阪市北区中之島1-1-1",
  //     Jan: 80,
  //     Feb: 90,
  //     Mar: 110,
  //     Apr: 130,
  //     May: 150,
  //     Jun: 170,
  //     Jul: 190,
  //     Aug: 210,
  //     Sep: 190,
  //     Oct: 170,
  //     Nov: 130,
  //     Dec: 100,
  //   },
  //   {
  //     id: "3",
  //     name: "バードウォッチングエリア",
  //     address: "福岡県福岡市博多区博多駅前1-1-1",
  //     Jan: 120,
  //     Feb: 140,
  //     Mar: 160,
  //     Apr: 180,
  //     May: 200,
  //     Jun: 220,
  //     Jul: 240,
  //     Aug: 260,
  //     Sep: 240,
  //     Oct: 220,
  //     Nov: 180,
  //     Dec: 160,
  //   },
  // ];

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
