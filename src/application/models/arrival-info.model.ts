import { TRAIN_LINE } from "../../shared/constants/train-line.enum.ts";
import { DIRECTION } from "../../shared/constants/direction.enum.ts";

export class ArrivalInfoModel {
  constructor(
    public readonly id: string,
    public readonly line: TRAIN_LINE,
    public readonly arrivalTime: number,
    public readonly departureTime: number,
    public readonly destination: string,
    public readonly direction: DIRECTION,
    public readonly alert?: string | undefined,
  ) {}

  getArrivalTimeInMinutes(): number {
    return Math.floor((this.arrivalTime - Date.now()) / (60 * 1000));
  }
}
