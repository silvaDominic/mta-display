import { TRAIN_LINE } from "../../shared/constants/train-line.enum.ts";
import { DIRECTION } from "../../shared/constants/direction.enum.ts";

export class ArrivalInfoModel {
  constructor(
    public readonly id: string,
    public readonly line: TRAIN_LINE,
    private readonly arrivalTime: number,
    public readonly destination: string,
    public readonly direction: DIRECTION,
    public readonly alert?: string | undefined,
  ) {}

  getArrivalTimeInMinutes(): number {
    return Math.round(Math.random() * 10);
    return this.arrivalTime / (1000 * 60);
  }
}
