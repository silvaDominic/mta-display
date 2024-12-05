import { useEffect, useState } from "react";
import { ArrivalInfoModel } from "../../application/models/arrival-info.model";
import { AlertModel } from "../../application/models/alert.model";
import { findNextTrainToLeave, getNewTime } from "../../shared/helpers";
import { TrainService } from "../../application/services/train.service";
import { DIRECTION } from "../../shared/constants/direction.enum";
import { SingleDirectionDisplay } from "../features/single-platform/single-direction-display.feature";
import { MultiDirectionDisplay } from "../features/multi-platform/multi-direction-display.feature";

enum DisplayType {
  Single,
  Multi,
}

export function DisplaysDemoPage() {
  const [arrivalTimes, setArrivalTimes] = useState<ArrivalInfoModel[]>([]);
  const [displayType, setDisplayType] = useState<DisplayType>(DisplayType.Single);
  const [alerts, setAlerts] = useState<AlertModel[]>([]);

  function onForceNextTrain() {
    const nextToLeave = findNextTrainToLeave(arrivalTimes);
    setArrivalTimes((prev: ArrivalInfoModel[]) => {
      const temp = [...prev];
      temp.splice(nextToLeave, 1);
      return [...temp, getNewTime()];
    });
  }

  function forceUpdate(): void {
    setArrivalTimes(prev => [...prev]);
  }

  function toggleAlerts(): void {
    if (alerts.length > 0) {
      setAlerts([]);
    } else {
      TrainService.getAlerts("[platformId]")
        .then(res => setAlerts(res));
    }
  }

  useEffect(() => {
    switch(displayType) {
      case DisplayType.Single:
        TrainService.getArrivalTimes("[platformId]", DIRECTION.N)
          .then(res => {
            setArrivalTimes(res);
          });
        break;
      case DisplayType.Multi:
        TrainService.getArrivalTimes("[platformId]", DIRECTION.BOTH)
          .then(res => {
            setArrivalTimes(res);
          });
        break;
    }
  }, [displayType]);

  function renderDisplay() {
    if (arrivalTimes.length > 0) {
      switch (displayType) {
        case DisplayType.Single:
          return <SingleDirectionDisplay arrivalTimes={arrivalTimes} alerts={alerts} onAlertEnd={toggleAlerts}/>;
        case DisplayType.Multi:
          return <MultiDirectionDisplay
            leftSideArrivals={arrivalTimes.filter((time: ArrivalInfoModel) => time.direction === DIRECTION.N)}
            rightSideArrivals={arrivalTimes.filter((time: ArrivalInfoModel) => time.direction === DIRECTION.S)}
            alerts={alerts}
            onAlertEnd={toggleAlerts}
          />;
      }
    }
  }

  return (
    <div id="displays-demo-page__container">
      <select id="display-select" onChange={(e) => setDisplayType(Number(e.target.value))}>
        <option value={DisplayType.Single}>Single-platform</option>
        <option value={DisplayType.Multi}>Multi-platform</option>
      </select>

      <button type='button' onClick={onForceNextTrain}>Force next train</button>
      <button type='button' onClick={forceUpdate}>Force update</button>
      <button type='button' onClick={toggleAlerts}>Toggle Alerts</button>

      {renderDisplay()}
    </div>
  );
}
