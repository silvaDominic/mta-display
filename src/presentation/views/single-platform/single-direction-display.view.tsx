import { ReactElement, useEffect, useState } from "react";
import { StopInfoModel } from "../../../application/models/stop-info.model";
import { Card } from "../../components/card";
import { Debug } from "../../components/debug";
import { AlertModel } from "../../../application/models/alert.model";
import { Alert } from "../../components/alert";

import '../display.scss';
import './single-direction-display.styles.scss';

type SingleDirectionDisplayViewProps = {
  arrivalTimes: StopInfoModel[],
  alerts: AlertModel[],
  onAlertEnd: () => void;
}

export function SingleDirectionDisplayView({arrivalTimes, alerts, onAlertEnd}: SingleDirectionDisplayViewProps): ReactElement {
  const sortedTimes: StopInfoModel[] = arrivalTimes.sort((timeA, timeB) => timeB.getTimeUntilArrivalInMinutes() - timeA.getTimeUntilArrivalInMinutes());
  const [displayedTimes, setDisplayedTimes] = useState<StopInfoModel[]>(sortedTimes);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isShowingAlert, setIsShowingAlert] = useState<boolean>(false);

  useEffect(() => {
    setDisplayedTimes((prev: StopInfoModel[]) => {
      if (prev !== sortedTimes) {
        setIsDeleting(true);
        return prev;
      }
      return sortedTimes;
    });
  }, [sortedTimes]);

  useEffect(() => {
    setIsShowingAlert(alerts.length > 0);
  }, [alerts]);

  function onTransitionEnd() {
    setIsDeleting(false);
    setDisplayedTimes(sortedTimes);
  }

  function applyDeleteClasses(index: number): string {
    return `${index === 2 && isDeleting ? 'deleting' : ''}`
  }

  function applyAlertClasses(): string {
    return isShowingAlert ? 'alerting' : '';
  }

  function applyBoardingClass(arrivalInfo: StopInfoModel): string {
    return '';
    return `${arrivalInfo.getTimeUntilDepartureInMinutes() === 0 ? 'boarding' : ''}`;
  }

  return (
    <>
      <div className={`sdd display__container ${applyAlertClasses()}`}>
        {
          displayedTimes?.map((arrData: StopInfoModel, index: number) => (
            <div
              key={arrData.id}
              className={
                `display__wrapper pos-${index}
              ${applyDeleteClasses(index)}`
              }
              onTransitionEnd={onTransitionEnd}
            >
              <Card
                title={arrData.destination}
                trainLine={arrData.line.toString()}
                minute={arrData.getTimeUntilArrivalInMinutes()}
                isFront={index > 1}
                className={applyBoardingClass(arrData)}
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

      <Debug arrivalTimes={arrivalTimes}/>
    </>
  );
}
