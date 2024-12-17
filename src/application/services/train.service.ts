import { StopInfoModel } from "../models/stop-info.model.ts";
import { DIRECTION } from "../../shared/constants/direction.enum.ts";
import { AlertModel } from "../models/alert.model";
import { StationModel } from "../models/station.model";
import { BASE_URL } from "../../presentation/constants";
import { TrainMapper } from "../utils/train.mapper";
import { TRAIN_LINES } from "../constants"

const NYC_SUBWAY_ENDPOINT = `${BASE_URL}/systems/us-ny-subway`;

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
  /**
   * Gets alert ids for a particular train line and then gets all alerts of those ids.
   * @param routeId
   */
  async getAlerts(routeId: string): Promise<AlertModel[]> {
    console.log(`Times for ${routeId}`);
    const ROUTES_URL = `${NYC_SUBWAY_ENDPOINT}/routes/${routeId}`;
    const ALERTS_URL = `${NYC_SUBWAY_ENDPOINT}/alerts`;
    try {
      // Get routes
      const routesResp = await fetch(`${ROUTES_URL}`);
      const routeData = await routesResp.json();

      // Extract Ids
      const alertIds: string[] = routeData.alerts.map((alert: any) => alert.id);
      // Build query params for alert ids
      const queryParams = [];
      for (const id of alertIds) {
        queryParams.push(`alert_id=${id}`);
      }
      // Fetch all alerts
      const alertResp = await fetch(`${ALERTS_URL}?${queryParams.join('&')}`);
      const alertData = await alertResp.json();

      return TrainMapper.dtoToAlertsModel(alertData.alerts);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
}
