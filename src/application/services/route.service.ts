import { ArrivalInfoModel } from "../models/arrival-info.model.ts";
import { TRAIN_LINE } from "../../shared/constants/train-line.enum.ts";
import { DIRECTION } from "../../shared/constants/direction.enum.ts";
import { fakeId, getRandomFutureTime } from "../../shared/helpers";


const STUB_ROUTE_INFO = [
  new ArrivalInfoModel(fakeId(), TRAIN_LINE.G, getRandomFutureTime(), Date.now() + 10, 'Church Ave', DIRECTION.S),
  new ArrivalInfoModel(fakeId(), TRAIN_LINE.G, getRandomFutureTime(), Date.now() + 10, 'Court St', DIRECTION.N),
  new ArrivalInfoModel(fakeId(), TRAIN_LINE.G, getRandomFutureTime(), Date.now() + 10, 'Court St', DIRECTION.N),
  new ArrivalInfoModel(fakeId(), TRAIN_LINE.G, getRandomFutureTime(), Date.now() + 10, 'Church Ave', DIRECTION.S),
  new ArrivalInfoModel(fakeId(), TRAIN_LINE.G, getRandomFutureTime(), Date.now() + 10, 'Church Ave', DIRECTION.S),
  new ArrivalInfoModel(fakeId(), TRAIN_LINE.G, getRandomFutureTime(), Date.now() + 10, 'Court St', DIRECTION.N),
];

export const RouteService = {
  getArrivalTimes(platformId: string, direction: DIRECTION): Promise<ArrivalInfoModel[]> {
    console.log(`Times for ${platformId}`);
    switch(direction) {
      case DIRECTION.N:
        return Promise.resolve(STUB_ROUTE_INFO).then(res => res.filter((data: ArrivalInfoModel)=> data.direction === DIRECTION.N));
      case DIRECTION.S:
        return Promise.resolve(STUB_ROUTE_INFO).then(res => res.filter((data: ArrivalInfoModel)=> data.direction === DIRECTION.S));
      case DIRECTION.BOTH:
        return Promise.resolve(STUB_ROUTE_INFO);
    }
  }
}
