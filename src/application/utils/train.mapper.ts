import { StationModel } from "../models/station.model";
import { StopInfoModel } from "../models/stop-info.model";

export const TrainMapper = {
  dtoToStationModel(dto: any): StationModel[] {
    return dto['serviceMaps'][0]['stops'].map(item => new StationModel(item.id, item.name));
  },

  dtoToStopInfoModel(dto: any, direction): StopInfoModel[] {
    return dto.stopTimes.map((info: any) => (
      new StopInfoModel(
        info.arrival.time,
        info.trip.route.id,
        info.arrival.time,
        info.departure.time,
        info.trip.destination.name,
        direction
      )
    ));
  }
}
