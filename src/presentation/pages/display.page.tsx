import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { TrainService } from "../../application/services/train.service";
import { StopInfoModel } from "../../application/models/stop-info.model";
import { SingleDirectionDisplayView } from "../views/single-platform/single-direction-display.view";
import { MultiDirectionDisplayView } from "../views/multi-platform/multi-direction-display.view";
import { DIRECTION } from "../../shared/constants/direction.enum";
import { AlertModel } from "../../application/models/alert.model";

export function DisplayPage() {
  const [arrivalTimes, setArrivalTimes] = useState<StopInfoModel[]>([]);
  const [alerts, setAlerts] = useState<AlertModel[]>([]);
  const {station, direction} = useParams();
  const [isShowingAlerts, setIsShowingAlerts] = useState<boolean>(false);

  useEffect(() => {
    const id = setInterval(() => {
      TrainService.getArrivalTimes(station, direction)
        .then(resp => setArrivalTimes(resp))
    }, 5000);

    return () => clearInterval(id);
  }, []);

  function renderDisplay() {
    if (arrivalTimes.length > 0) {
      switch (direction) {
        case DIRECTION.N:
        case DIRECTION.S:
          return <SingleDirectionDisplayView
            stop={arrivalTimes}
            alerts={alerts}
            isShowingAlerts={isShowingAlerts}
            onAlertEnd={() => setIsShowingAlerts(false)}
          />;
        case DIRECTION.BOTH:
          return <MultiDirectionDisplayView
            leftSideStops={arrivalTimes.filter((time: StopInfoModel) => time.direction === DIRECTION.N)}
            rightSideStops={arrivalTimes.filter((time: StopInfoModel) => time.direction === DIRECTION.S)}
            alerts={alerts}
            onAlertEnd={() => {}}
          />;
      }
    }
  }

  return (
    <div id='displays-page__container'>
      {renderDisplay()}
    </div>
  );
}
