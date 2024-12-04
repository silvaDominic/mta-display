import { ReactElement, useEffect, useState } from "react";
import { ArrivalInfoModel } from "../../../application/models/arrival-info.model";
import { Card } from "../../components/card";
import './single-direction-display.styles.scss';
import { Debug } from "../../components/debug";
import { AlertModel } from "../../../application/models/alert.model";
import { Alert } from "../../components/alert";

type SingleDirectionDisplayProps = {
  arrivalTimes: ArrivalInfoModel[],
  alerts: AlertModel[],
  onAlertEnd: () => void;
}

export function SingleDirectionDisplay({arrivalTimes, alerts, onAlertEnd}: SingleDirectionDisplayProps): ReactElement {
  const sortedTimes: ArrivalInfoModel[] = arrivalTimes.sort((timeA, timeB) => timeB.getTimeUntilArrivalInMinutes() - timeA.getTimeUntilArrivalInMinutes());
  const [displayedTimes, setDisplayedTimes] = useState<ArrivalInfoModel[]>(sortedTimes);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isShowingAlert, setIsShowingAlert] = useState<boolean>(false);

  useEffect(() => {
    setDisplayedTimes((prev: ArrivalInfoModel[]) => {
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

  function applyBoardingClass(arrivalInfo: ArrivalInfoModel): string {
    return '';
    return `${arrivalInfo.getTimeUntilDepartureInMinutes() === 0 ? 'boarding' : ''}`;
  }

  return (
    <>
      <div className={`sdd display__container ${applyAlertClasses()}`}>
        {
          displayedTimes?.map((arrData: ArrivalInfoModel, index: number) => (
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
