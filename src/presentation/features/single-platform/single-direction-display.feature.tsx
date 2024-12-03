import { ReactElement, useEffect, useRef, useState } from "react";
import { ArrivalInfoModel } from "../../../application/models/arrival-info.model";
import { Card } from "../../components/card";
import './single-direction-display.styles.scss';
import { Debug } from "../../components/debug";
import { AlertModel } from "../../../application/models/alert.model";

const BOTTOM_PADDING_OFFSET = 25;

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
  const alertContainerRef = useRef<HTMLDivElement>(null);
  const alertResolutionRef = useRef<HTMLDivElement>(null);

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

  /**
   * Handles scrolling alert content from bottom to top.
   * Based on a scroll increment and interval frequency, a scroll function is executed that
   * increments a reference to the top of the scrollable container until it reaches a limit.
   */
  useEffect(() => {
    const alertContainer = alertContainerRef.current;
    const alertResolution = alertResolutionRef.current;

    if (!alertContainer || !alertResolution) return;

    // Presets
    const offset = parseInt((window.getComputedStyle(alertResolution).paddingBottom)) - BOTTOM_PADDING_OFFSET;
    const scrollIncrement = 1;
    alertContainer.scrollTop = 0;

    const intervalId = setInterval(scroll, 20);

    function scroll(): void {
      if (alertContainer.scrollTop < alertContainer.scrollHeight - offset) {
        alertContainer.scrollTop += scrollIncrement;
      } else {
        // TODO: Consider how this will be handled with real time data
        setIsShowingAlert(false);
        onAlertEnd();
        clearInterval(intervalId);
      }
    }

    return () => clearInterval(intervalId);
  }, [isShowingAlert, onAlertEnd]);

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
      <div className={`sdd container ${applyAlertClasses()}`}>
        {
          displayedTimes?.map((arrData: ArrivalInfoModel, index: number) => (
            <div
              key={arrData.id}
              className={
                `sdd wrapper pos-${index}
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
          alerts.length > 0 && (
            <div ref={alertContainerRef} className='alert-container'>
              <div className='alert-description'>{alerts[0].description}</div>
              <div ref={alertResolutionRef} className='alert-resolution'>{alerts[0].resolution}</div>
            </div>
          )
        }
      </div>

      <hr/>

      <Debug arrivalTimes={arrivalTimes}/>
    </>
  );
}
