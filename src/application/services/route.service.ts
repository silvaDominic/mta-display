import { ArrivalInfoModel } from "../models/arrival-info.model.ts";
import { TRAIN_LINE } from "../../shared/constants/train-line.enum.ts";
import { DIRECTION } from "../../shared/constants/direction.enum.ts";
import { fakeId, getRandomFutureTime } from "../../shared/helpers";
import { AlertModel } from "../models/alert.model";
import { RouteModel } from "../models/route.model";

const STUB_TIME_DATA = [
  new ArrivalInfoModel(fakeId(), TRAIN_LINE.G, getRandomFutureTime(), Date.now() + 10, 'Church Ave', DIRECTION.S),
  new ArrivalInfoModel(fakeId(), TRAIN_LINE.G, getRandomFutureTime(), Date.now() + 10, 'Court St', DIRECTION.N),
  new ArrivalInfoModel(fakeId(), TRAIN_LINE.G, getRandomFutureTime(), Date.now() + 10, 'Court St', DIRECTION.N),
  new ArrivalInfoModel(fakeId(), TRAIN_LINE.G, getRandomFutureTime(), Date.now() + 10, 'Church Ave', DIRECTION.S),
  new ArrivalInfoModel(fakeId(), TRAIN_LINE.G, getRandomFutureTime(), Date.now() + 10, 'Church Ave', DIRECTION.S),
  new ArrivalInfoModel(fakeId(), TRAIN_LINE.G, getRandomFutureTime(), Date.now() + 10, 'Court St', DIRECTION.N),
];

const STUB_ALERT_DATA = [
  new AlertModel(
    "In Manhattan, uptown [6] skips 51 St, 68 St, 77 St, 96 St, 103 St, 110 St and 116 St",
    "For service to these stations, take the [6] to 59 St or 125 St accessibility icon and transfer to a downtown [4] local or [6].\n\nFor service from these stations, take the [4] or [6] to 59 St or Grand Central-42 St accessibility icon and transfer to an uptown [6].\n\nTravel tip:\nTransfer between uptown and downtown trains with Unlimited Ride MetroCard or fare-capped OMNY at 86 St.\n\nWhat's happening?\nEscalator replacement\n\naccessibility icon This service change affects one or more ADA accessible stations and these travel alternatives may not be fully accessible. Please contact 511 to plan your trip."
  )
];

const STUB_ROUTE_DATA = [
  new RouteModel('G', 'G'),
  new RouteModel('D', 'D'),
  new RouteModel('1', '1'),
  new RouteModel('2', '2'),
  new RouteModel('3', '3'),
];

export const RouteService = {
  getArrivalTimes(platformId: string, direction: DIRECTION): Promise<ArrivalInfoModel[]> {
    console.log(`Times for ${platformId}`);
    switch (direction) {
      case DIRECTION.N:
        return Promise.resolve(STUB_TIME_DATA).then(res => res.filter((data: ArrivalInfoModel)=> data.direction === DIRECTION.N));
      case DIRECTION.S:
        return Promise.resolve(STUB_TIME_DATA).then(res => res.filter((data: ArrivalInfoModel)=> data.direction === DIRECTION.S));
      case DIRECTION.BOTH:
        return Promise.resolve(STUB_TIME_DATA);
    }
  },
  getAlerts(platformId: string): Promise<AlertModel[]> {
    console.log(`Times for ${platformId}`);
    return Promise.resolve(STUB_ALERT_DATA);
  },
  getRoutes(): Promise<RouteModel[]> {
    return Promise.resolve(STUB_ROUTE_DATA);
  }
}
