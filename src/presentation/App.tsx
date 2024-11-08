import './App.scss';
import { useEffect, useState } from "react";
import { ArrivalInfoModel } from "../application/models/arrival-info.model.ts";
import { RouteService } from "../application/services/route.service.ts";
import { DIRECTION } from "../shared/constants/direction.enum.ts";
import { MultiPlatformDisplay } from "./features/multi-platform/multi-platform-display.feature";

function App() {
  const [arrivalTimes, setArrivalTimes] = useState<Map<DIRECTION, ArrivalInfoModel[]>>(new Map<DIRECTION, ArrivalInfoModel[]>());

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

  return <MultiPlatformDisplay arrivalTimes={arrivalTimes}/>;
}
export default App;
