import { StationModel } from "../models/station.model";
import { StopInfoModel } from "../models/stop-info.model";
import { AlertModel } from "../models/alert.model";

export const TrainMapper = {
  dtoToStationModel(dto: any): StationModel[] {
    return dto['serviceMaps'][0]['stops'].map(item => new StationModel(item.id, item.name));
  },

  dtoToStopInfoModel(dto: any, direction): StopInfoModel[] {
    return dto.stopTimes.slice(0, 3).map((info: any) => (
      new StopInfoModel(
        info.trip.id,
        info.trip.route.id,
        info.arrival.time,
        info.departure.time,
        info.trip.destination.name,
        direction
      )
    ));
  },
  dtoToAlertsModel(alerts: any[]): AlertModel[] {
    const alertModels: AlertModel[] = [];
    alerts.forEach(alert => {
      const header = alert.header.find((header: any) => header.language === 'en');
      const description = alert.description.find((desc: any) => desc.language === 'en') || "";
      alertModels.push(new AlertModel(header.text, description.text));
    });
    return alertModels;
  }
}
