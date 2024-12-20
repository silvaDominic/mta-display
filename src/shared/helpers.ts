import { StopInfoModel } from "../application/models/stop-info.model";
import { TRAIN_LINE } from "./constants/train-line.enum";
import { DIRECTION } from "./constants/direction.enum";

export function fakeId(): string{
  return (Math.random() * 1000000).toString();
}

export function getRandomFutureTime(minTime = 2, maxTime = 20): number {
  const minutesRemaining = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
  return (Date.now() / 1000) + (minutesRemaining * 60);
}

export function findNextTrainToLeave(stops: StopInfoModel[]): number {
  const timeToLeaveValues = stops.map(stop => stop.arrivalTime);
  const lowestTimeToLeave = Math.min(...timeToLeaveValues);

  return timeToLeaveValues.indexOf(lowestTimeToLeave);
}

export function getNewTime(): StopInfoModel {
  const destination = Math.round(Math.random()) > 0 ? 'Court St' : 'Church Ave';

  return new StopInfoModel(
    fakeId(),
    TRAIN_LINE.G,
    getRandomFutureTime(),
    (Date.now() / 1000) + 10,
    destination,
    destination === 'Court St' ? DIRECTION.N : DIRECTION.S,
  );
}
