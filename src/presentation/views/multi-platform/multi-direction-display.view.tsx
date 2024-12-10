import { StopInfoModel } from "../../../application/models/stop-info.model";
import { Card } from "../../components/card";
import { Debug } from "../../components/debug";
import { Alert } from "../../components/alert";
import { AlertModel } from "../../../application/models/alert.model";
import { useEffect, useState } from "react";

import '../display.scss';
import './multi-direction-display.styles.scss';

type MultiDirectionDisplayViewProps = {
  leftSideArrivals: StopInfoModel[];
  rightSideArrivals: StopInfoModel[];
  alerts: AlertModel[];
  onAlertEnd: () => void;
}

export function MultiDirectionDisplayView({leftSideArrivals, rightSideArrivals, alerts, onAlertEnd}: MultiDirectionDisplayViewProps) {
  const [isShowingAlert, setIsShowingAlert] = useState<boolean>(false);
  const sortedLeftSideArrivals = leftSideArrivals
    .sort((timeA, timeB) => timeB.getTimeUntilArrivalInMinutes() - timeA.getTimeUntilArrivalInMinutes()).slice(0, 3);
  const sortedRightSideArrivals = rightSideArrivals
    .sort((timeA, timeB) => timeB.getTimeUntilArrivalInMinutes() - timeA.getTimeUntilArrivalInMinutes()).slice(0, 3);

  useEffect(() => {
    setIsShowingAlert(alerts.length > 0);
  }, [alerts]);

  function applyAlertClasses(): string {
    return isShowingAlert ? 'alerting' : '';
  }

  function applyBoardingClass(arrivalInfo: StopInfoModel): string {
    return '';
    return `${arrivalInfo.getTimeUntilDepartureInMinutes() === 0 ? 'boarding' : ''}`;
  }

  return (
    <>
      <div id="stack" className={`${applyAlertClasses()}`}>
        <div id='stack-wrapper'>
          <div className={`mdd display__container`}>
            {
              sortedLeftSideArrivals.map((arrData: StopInfoModel, index: number) => (
                <div key={arrData.id} className={`mdd display__wrapper pos-${index}`}>
                  <div className="left-direction direction">
                    <img src="../../public/icons/arrow-left-circle-outlined.svg" alt="Left arrow"/>
                    <Card
                      title={arrData.destination}
                      trainLine={arrData.line.toString()}
                      minute={arrData.getTimeUntilArrivalInMinutes()}
                      isFront={index > 1}
                      className={`${applyBoardingClass(arrData)}`}
                    />
                  </div>
                </div>
              ))
            }
          </div>

          <div className="mdd display__container">
            {
              sortedRightSideArrivals.map((arrData: StopInfoModel, index: number) => (
                <div key={arrData.id} className={`mdd display__wrapper pos-${index}`}>
                  <div className="right-direction direction">
                    <img src="../../public/icons/arrow-right-circle-outlined.svg" alt="Right arrow"/>
                    <Card
                      title={arrData.destination}
                      trainLine={arrData.line.toString()}
                      minute={arrData.getTimeUntilArrivalInMinutes()}
                      isFront={index > 1}
                      className={`${applyBoardingClass(arrData)}`}
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
        <Debug arrivalTimes={sortedLeftSideArrivals}/>
      </div>

      <div style={{color: 'white'}}>
        <h3>Right</h3>
        <Debug arrivalTimes={sortedRightSideArrivals}/>
      </div>
    </>
  );
}
