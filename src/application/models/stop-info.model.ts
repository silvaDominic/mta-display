import { TRAIN_LINE } from "../../shared/constants/train-line.enum.ts";
import { DIRECTION } from "../../shared/constants/direction.enum.ts";

export class StopInfoModel {
  constructor(
    public readonly id: string,
    public readonly line: TRAIN_LINE,
    public readonly arrivalTime: number,
    public readonly departureTime: number,
    public readonly destination: string,
    public readonly direction: DIRECTION,
    public readonly alert?: string | undefined,
  ) {}

  getTimeUntilArrivalInMinutes(): number {
    return Math.round(((this.arrivalTime * 1000) - Date.now()) / (60 * 1000));
  }

  getTimeUntilDepartureInMinutes(): number {
    return Math.round(((this.departureTime * 1000) - Date.now()) / (60 * 1000));
  }
}
