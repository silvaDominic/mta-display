import { StationModel } from "../models/station.model";

export const TrainMapper = {
  dtoToStationModel(dto: any): StationModel[] {
    return dto['serviceMaps'][0]['stops'].map(item => new StationModel(item.id, item.name));
  },
}
