import { StopInfoModel } from "../models/stop-info.model.ts";
import { DIRECTION } from "../../shared/constants/direction.enum.ts";
import { AlertModel } from "../models/alert.model";
import { StationModel } from "../models/station.model";
import { BASE_URL } from "../../presentation/constants";
import { TrainMapper } from "../utils/train.mapper";
import { TRAIN_LINES } from "../constants"

const NYC_SUBWAY_ENDPOINT = `${BASE_URL}/systems/us-ny-subway`;

const STUB_ALERT_DATA = [
  new AlertModel(
    "In Manhattan, uptown [6] skips 51 St, 68 St, 77 St, 96 St, 103 St, 110 St and 116 St",
    "For service to these stations, take the [6] to 59 St or 125 St accessibility icon and transfer to a downtown [4] local or [6].\n\nFor service from these stations, take the [4] or [6] to 59 St or Grand Central-42 St accessibility icon and transfer to an uptown [6].\n\nTravel tip:\nTransfer between uptown and downtown trains with Unlimited Ride MetroCard or fare-capped OMNY at 86 St.\n\nWhat's happening?\nEscalator replacement\n\naccessibility icon This service change affects one or more ADA accessible stations and these travel alternatives may not be fully accessible. Please contact 511 to plan your trip."
  )
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
  async getArrivalTimes(stationId: string, direction: DIRECTION): Promise<StopInfoModel[]> {
    const URL = `${NYC_SUBWAY_ENDPOINT}/stops/${stationId}${direction}`;
    try {
      const resp = await fetch(URL);
      const data = await resp.json();
      return TrainMapper.dtoToStopInfoModel(data, direction).slice(0, 3);
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  },
  getAlerts(platformId: string): Promise<AlertModel[]> {
    console.log(`Times for ${platformId}`);
    return Promise.resolve(STUB_ALERT_DATA);
  },
}
