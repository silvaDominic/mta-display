import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { TrainService } from "../../application/services/train.service";
import { ArrivalInfoModel } from "../../application/models/arrival-info.model";
import { SingleDirectionDisplay } from "../features/single-platform/single-direction-display.feature";
import { MultiDirectionDisplay } from "../features/multi-platform/multi-direction-display.feature";
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
          return <SingleDirectionDisplay arrivalTimes={arrivalTimes} alerts={alerts} onAlertEnd={() => {}}/>;
        case DIRECTION.BOTH:
          return <MultiDirectionDisplay
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
