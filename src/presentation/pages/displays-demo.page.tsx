import { useEffect, useState } from "react";
import { StopInfoModel } from "../../application/models/stop-info.model";
import { AlertModel } from "../../application/models/alert.model";
import { findNextTrainToLeave, getNewTime } from "../../shared/helpers";
import { TrainService } from "../../application/services/train.service";
import { DIRECTION } from "../../shared/constants/direction.enum";
import { SingleDirectionDisplayView } from "../views/single-platform/single-direction-display.view";
import { MultiDirectionDisplayView } from "../views/multi-platform/multi-direction-display.view";

enum DisplayType {
  Single,
  Multi,
}

export function DisplaysDemoPage() {
  const [arrivalTimes, setArrivalTimes] = useState<StopInfoModel[]>([]);
  const [displayType, setDisplayType] = useState<DisplayType>(DisplayType.Single);
  const [alerts, setAlerts] = useState<AlertModel[]>([]);

  function onForceNextTrain() {
    const nextToLeave = findNextTrainToLeave(arrivalTimes);
    setArrivalTimes((prev: StopInfoModel[]) => {
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
          return <SingleDirectionDisplayView arrivalTimes={arrivalTimes} alerts={alerts} onAlertEnd={toggleAlerts}/>;
        case DisplayType.Multi:
          return <MultiDirectionDisplayView
            leftSideArrivals={arrivalTimes.filter((time: StopInfoModel) => time.direction === DIRECTION.N)}
            rightSideArrivals={arrivalTimes.filter((time: StopInfoModel) => time.direction === DIRECTION.S)}
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
