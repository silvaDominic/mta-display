import { ReactElement, useEffect, useState } from "react";
import { StopInfoModel } from "../../../application/models/stop-info.model";
import { Card } from "../../components/card";
import { Debug } from "../../components/debug";
import { AlertModel } from "../../../application/models/alert.model";
import { Alert } from "../../components/alert";

import '../display.scss';
import './single-direction-display.styles.scss';

type SingleDirectionDisplayViewProps = {
  stop: StopInfoModel[],
  alerts: AlertModel[],
  onAlertEnd: () => void;
}

export function SingleDirectionDisplayView({stop, alerts, onAlertEnd}: SingleDirectionDisplayViewProps): ReactElement {
  const sortedStopData: StopInfoModel[] = stop.sort((stopA, stopB) => stopB.getTimeUntilArrivalInMinutes() - stopA.getTimeUntilArrivalInMinutes());
  const [displayedTimes, setDisplayedTimes] = useState<StopInfoModel[]>(sortedStopData);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isShowingAlert, setIsShowingAlert] = useState<boolean>(false);

  useEffect(() => {
    setDisplayedTimes((prev: StopInfoModel[]) => {
      if (prev !== sortedStopData) {
        setIsDeleting(true);
        return prev;
      }
      return sortedStopData;
    });
  }, [sortedStopData]);

  useEffect(() => {
    setIsShowingAlert(alerts.length > 0);
  }, [alerts]);

  function onTransitionEnd() {
    setIsDeleting(false);
    setDisplayedTimes(sortedStopData);
  }

  function applyDeleteClasses(index: number): string {
    return `${index === 2 && isDeleting ? 'deleting' : ''}`
  }

  function applyAlertClasses(): string {
    return isShowingAlert ? 'alerting' : '';
  }

  function applyBoardingClass(stop: StopInfoModel): string {
    return '';
    return `${stop.getTimeUntilDepartureInMinutes() === 0 ? 'boarding' : ''}`;
  }

  return (
    <>
      <div className={`sdd display__container ${applyAlertClasses()}`}>
        {
          displayedTimes?.map((stop: StopInfoModel, index: number) => (
            <div
              key={stop.id}
              className={
                `display__wrapper pos-${index}
              ${applyDeleteClasses(index)}`
              }
              onTransitionEnd={onTransitionEnd}
            >
              <Card
                title={stop.destination}
                trainLine={stop.line.toString()}
                minute={stop.getTimeUntilArrivalInMinutes()}
                isFront={index > 1}
                className={applyBoardingClass(stop)}
              />
            </div>
          ))
        }
        {
          alerts.length > 0 &&
          <Alert
            alert={alerts[0]}
            onAlertEnd={onAlertEnd}
            className={'sdd'}
          />
        }
      </div>

      <hr/>

      <Debug stops={stop}/>
    </>
  );
}
