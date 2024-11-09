import './App.scss';
import { useEffect, useState } from "react";
import { ArrivalInfoModel } from "../application/models/arrival-info.model.ts";
import { RouteService } from "../application/services/route.service.ts";
import { DIRECTION } from "../shared/constants/direction.enum.ts";
import { MultiPlatformDisplay } from "./features/multi-platform/multi-platform-display.feature";
import { SinglePlatformDisplay } from "./features/single-platform/single-platform-display.feature";

enum DisplayType {
  Single,
  Multi,
}

function App() {
  const [arrivalTimes, setArrivalTimes] = useState<Map<DIRECTION, ArrivalInfoModel[]>>(new Map<DIRECTION, ArrivalInfoModel[]>());
  const [displayType, setDisplayType] = useState<DisplayType>(DisplayType.Single);

  useEffect(() => {
    const map = new Map<DIRECTION, ArrivalInfoModel[]>();
    RouteService.getArrivalTimes("[platformId]").then((res: ArrivalInfoModel[]) => {
      res.map((arrTime: ArrivalInfoModel) => {
        // Set if exist otherwise update values
        map.set(
          arrTime.direction,
          map.get(arrTime.direction) ? [...map.get(arrTime.direction) as ArrivalInfoModel[], arrTime] : [arrTime]);
      });
      setArrivalTimes(map);
    });
  }, []);

  function renderDisplay() {
    switch(displayType) {
      case DisplayType.Single:
        return <SinglePlatformDisplay arrivalTimes={arrivalTimes} direction={DIRECTION.N}/>;
      case DisplayType.Multi:
        return <MultiPlatformDisplay arrivalTimes={arrivalTimes}/>;
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
    </>



)
  ;
}

export default App;
