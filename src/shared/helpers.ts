import { ArrivalInfoModel } from "../application/models/arrival-info.model";
import { TRAIN_LINE } from "./constants/train-line.enum";
import { DIRECTION } from "./constants/direction.enum";

export function fakeId(): string{
  return (Math.random() * 1000000).toString();
}

export function getRandomFutureTime(minTime = 2, maxTime = 20): number {
  const minutesRemaining = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
  return Date.now() + (minutesRemaining * 60 * 1000);
}

export function findNextTrainToLeave(arrivalTimes: ArrivalInfoModel[]): number {
  const timeToLeaveValues = arrivalTimes.map(time => time.arrivalTime);
  const lowestTimeToLeave = Math.min(...timeToLeaveValues);

  return timeToLeaveValues.indexOf(lowestTimeToLeave);
}

export function getNewTime(): ArrivalInfoModel {
  const destination = Math.round(Math.random()) > 0 ? 'Court St' : 'Church Ave';

  return new ArrivalInfoModel(
    fakeId(),
    TRAIN_LINE.G,
    getRandomFutureTime(),
    Date.now() + 10,
    destination,
    destination === 'Court St' ? DIRECTION.N : DIRECTION.S,
  );
}
