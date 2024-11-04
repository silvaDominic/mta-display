import { TRAIN_LINE } from "../../shared/constants/train-line.enum.ts";
import { DIRECTION } from "../../shared/constants/direction.enum.ts";

export class ArrivalInfoModel {
  constructor(
    private _line: TRAIN_LINE,
    private _arrivalTime: number,
    private _destination: string,
    private _direction: DIRECTION,
    private _alert?: string | undefined,
  ) {}

  get line(): TRAIN_LINE {
    return this._line;
  }

  get arrivalTime(): number {
    return this._arrivalTime;
  }

  get destination(): string {
    return this._destination;
  }

  get direction(): DIRECTION {
    return this._direction;
  }

  get alert(): string | undefined {
    return this._alert;
  }

  getArrivalTimeInMinutes(): number {
    return Math.round(Math.random() * 10);
  }
}
