import { ArrivalInfoModel } from "../models/arrival-info.model.ts";
import { TRAIN_LINE } from "../../shared/constants/train-line.enum.ts";
import { DIRECTION } from "../../shared/constants/direction.enum.ts";

const STUB_ROUTE_INFO = [
  new ArrivalInfoModel(TRAIN_LINE.G, Date.now(), 'Church Ave', DIRECTION.S),
  new ArrivalInfoModel(TRAIN_LINE.G, Date.now(), 'Court St', DIRECTION.N),
  new ArrivalInfoModel(TRAIN_LINE.G, Date.now(), 'Court St', DIRECTION.N),
  new ArrivalInfoModel(TRAIN_LINE.G, Date.now(), 'Church Ave', DIRECTION.S),
  new ArrivalInfoModel(TRAIN_LINE.G, Date.now(), 'Church Ave', DIRECTION.S),
  new ArrivalInfoModel(TRAIN_LINE.G, Date.now(), 'Court St', DIRECTION.N),
];

export const RouteService = {
  getArrivalTimes(platformId: string): Promise<ArrivalInfoModel[]> {
    console.log(`Times for ${platformId}`);
    return Promise.resolve(STUB_ROUTE_INFO);
  }
}
