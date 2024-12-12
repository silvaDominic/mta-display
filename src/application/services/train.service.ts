import { StopInfoModel } from "../models/stop-info.model.ts";
import { TRAIN_LINE } from "../../shared/constants/train-line.enum.ts";
import { DIRECTION } from "../../shared/constants/direction.enum.ts";
import { fakeId, getRandomFutureTime } from "../../shared/helpers";
import { AlertModel } from "../models/alert.model";
import { StationModel } from "../models/station.model";
import { PlatformModel } from "../models/platform.model";
import { BASE_URL } from "../../presentation/constants";
import { TrainMapper } from "../utils/train.mapper";
import { TRAIN_LINES } from "../constants"

const NYC_SUBWAY_ENDPOINT = `${BASE_URL}/systems/us-ny-subway`;

const STUB_TIME_DATA = [
  new StopInfoModel(fakeId(), TRAIN_LINE.G, getRandomFutureTime(), Date.now() + 10, 'Church Ave', DIRECTION.S),
  new StopInfoModel(fakeId(), TRAIN_LINE.G, getRandomFutureTime(), Date.now() + 10, 'Court St', DIRECTION.N),
  new StopInfoModel(fakeId(), TRAIN_LINE.G, getRandomFutureTime(), Date.now() + 10, 'Court St', DIRECTION.N),
  new StopInfoModel(fakeId(), TRAIN_LINE.G, getRandomFutureTime(), Date.now() + 10, 'Church Ave', DIRECTION.S),
  new StopInfoModel(fakeId(), TRAIN_LINE.G, getRandomFutureTime(), Date.now() + 10, 'Church Ave', DIRECTION.S),
  new StopInfoModel(fakeId(), TRAIN_LINE.G, getRandomFutureTime(), Date.now() + 10, 'Court St', DIRECTION.N),
];

const STUB_TIME_DATA_NORTH = STUB_TIME_DATA.filter((data: StopInfoModel)=> data.direction === DIRECTION.N);
const STUB_TIME_DATA_SOUTH = STUB_TIME_DATA.filter((data: StopInfoModel)=> data.direction === DIRECTION.S);

const STUB_ALERT_DATA = [
  new AlertModel(
    "In Manhattan, uptown [6] skips 51 St, 68 St, 77 St, 96 St, 103 St, 110 St and 116 St",
    "For service to these stations, take the [6] to 59 St or 125 St accessibility icon and transfer to a downtown [4] local or [6].\n\nFor service from these stations, take the [4] or [6] to 59 St or Grand Central-42 St accessibility icon and transfer to an uptown [6].\n\nTravel tip:\nTransfer between uptown and downtown trains with Unlimited Ride MetroCard or fare-capped OMNY at 86 St.\n\nWhat's happening?\nEscalator replacement\n\naccessibility icon This service change affects one or more ADA accessible stations and these travel alternatives may not be fully accessible. Please contact 511 to plan your trip."
  )
];

const STUB_PLATFORM_DATA = [
  new PlatformModel('unknown', 'Carrol St', 'Court St', DIRECTION.N),
  new PlatformModel('unknown', 'Carrol St', 'Church St', DIRECTION.S),
];

type TrainLine = {
  id: string,
  shortName: string,
  longName: string,
  description: string,
  imgRef: string,
}

export const TrainService = {
  getTrainLines(): TrainLine[] {
    return Object.values(TRAIN_LINES as Record<string, TrainLine>);
  },
  async getStations(routeId: string): Promise<StationModel[]> {
    const URL = `${NYC_SUBWAY_ENDPOINT}/routes/${routeId}`;
    try {
      const resp = await fetch(`${URL}`);
      const data = await resp.json();
      return TrainMapper.dtoToStationModel(data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  getPlatform(stationId: string): Promise<PlatformModel[]> {
    console.log(`GET PLATFORMS FOR STATION: ${stationId}`);
    return Promise.resolve(STUB_PLATFORM_DATA);
  },
  getArrivalTimes(platformId: string, direction: DIRECTION): Promise<StopInfoModel[]> {
    console.log(`GET ARRIVAL TIMES FOR ${platformId} HEADING ${direction}`);
    switch (direction) {
      case DIRECTION.N:
        return Promise.resolve(STUB_TIME_DATA_NORTH).then(res => res);
      case DIRECTION.S:
        return Promise.resolve(STUB_TIME_DATA_SOUTH).then(res => res);
      case DIRECTION.BOTH:
        return Promise.resolve(STUB_TIME_DATA);
    }
  },
  getAlerts(platformId: string): Promise<AlertModel[]> {
    console.log(`Times for ${platformId}`);
    return Promise.resolve(STUB_ALERT_DATA);
  },
}
