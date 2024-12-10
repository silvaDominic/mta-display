import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { TrainService } from "../../application/services/train.service";
import { ArrivalInfoModel } from "../../application/models/arrival-info.model";
import { SingleDirectionDisplayView } from "../views/single-platform/single-direction-display.view";
import { MultiDirectionDisplayView } from "../views/multi-platform/multi-direction-display.view";
import { DIRECTION } from "../../shared/constants/direction.enum";
import { AlertModel } from "../../application/models/alert.model";

export function DisplayPage() {
  const [arrivalTimes, setArrivalTimes] = useState<ArrivalInfoModel[]>([]);
  const [alerts, setAlerts] = useState<AlertModel[]>([]);
  const {station, direction} = useParams();

  useEffect(() => {
    TrainService.getArrivalTimes(station, direction)
      .then(res => setArrivalTimes(res));
  }, []);

  function renderDisplay() {
    if (arrivalTimes.length > 0) {
      switch (direction) {
        case DIRECTION.N:
        case DIRECTION.S:
          return <SingleDirectionDisplayView arrivalTimes={arrivalTimes} alerts={alerts} onAlertEnd={() => {}}/>;
        case DIRECTION.BOTH:
          return <MultiDirectionDisplayView
            leftSideArrivals={arrivalTimes.filter((time: ArrivalInfoModel) => time.direction === DIRECTION.N)}
            rightSideArrivals={arrivalTimes.filter((time: ArrivalInfoModel) => time.direction === DIRECTION.S)}
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
