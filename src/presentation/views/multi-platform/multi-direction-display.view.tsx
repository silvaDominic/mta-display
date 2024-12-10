import { StopInfoModel } from "../../../application/models/stop-info.model";
import { Card } from "../../components/card";
import { Debug } from "../../components/debug";
import { Alert } from "../../components/alert";
import { AlertModel } from "../../../application/models/alert.model";
import { useEffect, useState } from "react";

import '../display.scss';
import './multi-direction-display.styles.scss';

type MultiDirectionDisplayViewProps = {
  leftSideStops: StopInfoModel[];
  rightSideStops: StopInfoModel[];
  alerts: AlertModel[];
  onAlertEnd: () => void;
}

export function MultiDirectionDisplayView({leftSideStops, rightSideStops, alerts, onAlertEnd}: MultiDirectionDisplayViewProps) {
  const [isShowingAlert, setIsShowingAlert] = useState<boolean>(false);
  const sortedLeftSideStops = leftSideStops
    .sort((stopA, stopB) => stopB.getTimeUntilArrivalInMinutes() - stopA.getTimeUntilArrivalInMinutes()).slice(0, 3);
  const sortedRightSideStops = rightSideStops
    .sort((stopA, stopB) => stopB.getTimeUntilArrivalInMinutes() - stopA.getTimeUntilArrivalInMinutes()).slice(0, 3);

  useEffect(() => {
    setIsShowingAlert(alerts.length > 0);
  }, [alerts]);

  function applyAlertClasses(): string {
    return isShowingAlert ? 'alerting' : '';
  }

  function applyBoardingClass(stop: StopInfoModel): string {
    return '';
    return `${stop.getTimeUntilDepartureInMinutes() === 0 ? 'boarding' : ''}`;
  }

  return (
    <>
      <div id="stack" className={`${applyAlertClasses()}`}>
        <div id='stack-wrapper'>
          <div className={`mdd display__container`}>
            {
              sortedLeftSideStops.map((stop: StopInfoModel, index: number) => (
                <div key={stop.id} className={`mdd display__wrapper pos-${index}`}>
                  <div className="left-direction direction">
                    <img src="../../public/icons/arrow-left-circle-outlined.svg" alt="Left arrow"/>
                    <Card
                      title={stop.destination}
                      trainLine={stop.line.toString()}
                      minute={stop.getTimeUntilArrivalInMinutes()}
                      isFront={index > 1}
                      className={`${applyBoardingClass(stop)}`}
                    />
                  </div>
                </div>
              ))
            }
          </div>

          <div className="mdd display__container">
            {
              sortedRightSideStops.map((stop: StopInfoModel, index: number) => (
                <div key={stop.id} className={`mdd display__wrapper pos-${index}`}>
                  <div className="right-direction direction">
                    <img src="../../public/icons/arrow-right-circle-outlined.svg" alt="Right arrow"/>
                    <Card
                      title={stop.destination}
                      trainLine={stop.line.toString()}
                      minute={stop.getTimeUntilArrivalInMinutes()}
                      isFront={index > 1}
                      className={`${applyBoardingClass(stop)}`}
                    />
                  </div>
                </div>
              ))
            }
          </div>
        </div>


        {
          alerts.length > 0 &&
          <Alert
            alert={alerts[0]}
            onAlertEnd={onAlertEnd}
            className={'mdd'}
          />
        }
      </div>

      <hr/>

      <div style={{color: 'white'}}>
        <h3>Left</h3>
        <Debug stops={sortedLeftSideStops}/>
      </div>

      <div style={{color: 'white'}}>
        <h3>Right</h3>
        <Debug stops={sortedRightSideStops}/>
      </div>
    </>
  );
}
