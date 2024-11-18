import './app.scss';
import { useEffect, useState } from "react";
import { ArrivalInfoModel } from "../application/models/arrival-info.model.ts";
import { RouteService } from "../application/services/route.service.ts";
import { DIRECTION } from "../shared/constants/direction.enum.ts";
import { MultiDirectionDisplay } from "./features/multi-platform/multi-direction-display.feature";
import { SingleDirectionDisplay } from "./features/single-platform/single-direction-display.feature";
import { findNextTrainToLeave, getNewTime } from "../shared/helpers";

enum DisplayType {
  Single,
  Multi,
}

function App() {
  const [arrivalTimes, setArrivalTimes] = useState<ArrivalInfoModel[]>([]);
  const [displayType, setDisplayType] = useState<DisplayType>(DisplayType.Single);

  function onForceNextTrain() {
    const nextToLeave = findNextTrainToLeave(arrivalTimes);
    setArrivalTimes((prev: ArrivalInfoModel[]) => {
      const temp = [...prev];
      temp.splice(nextToLeave, 1);
      return [...temp, getNewTime()];
    });
  }

  useEffect(() => {
    RouteService.getArrivalTimes("[platformId]", DIRECTION.N)
      .then(res => {
        setArrivalTimes(res);
      });
  }, []);

  function renderDisplay() {
    if (arrivalTimes.length > 0) {
      switch (displayType) {
        case DisplayType.Single:
          return <SingleDirectionDisplay arrivalTimes={arrivalTimes}/>;
        case DisplayType.Multi:
          return <MultiDirectionDisplay arrivalTimes={arrivalTimes}/>;
      }
    }
  }

  return (
    <>
      <div>
        <select id="display-select" onChange={(e) => setDisplayType(Number(e.target.value))}>
          <option value={DisplayType.Single}>Single-platform</option>
          <option value={DisplayType.Multi}>Multi-platform</option>
        </select>

      </div>

      {renderDisplay()}

      <button type='button' onClick={onForceNextTrain}>Force next train</button>
    </>
  );
}

export default App;
