import './App.scss'
import { Card } from "./components/card.tsx";
import { useEffect, useState } from "react";
import { ArrivalInfoModel } from "../application/models/arrival-info.model.ts";
import { RouteService } from "../application/services/route.service.ts";
import { DIRECTION } from "../shared/constants/direction.enum.ts";

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

  return (
    <>
      <div id="stack">
        <div className="container">
          {
            arrivalTimes?.get(DIRECTION.N)?.map((arrData: ArrivalInfoModel, index) => (
              <div className={`wrapper pos-${index}`}>
                <div className="left-direction direction">
                  <img src="./public/icons/arrow-left-circle-outlined.svg" alt="Left arrow"/>
                  <Card
                    title={arrData.destination}
                    trainLine={arrData.line.toString()}
                    minute={arrData.getArrivalTimeInMinutes()}
                  />
                </div>
              </div>
            ))
          }
        </div>

        <div className="container">
          {
            arrivalTimes?.get(DIRECTION.S)?.map((arrData: ArrivalInfoModel, index) => (
              <div className={`wrapper pos-${index}`}>
                <div className="right-direction direction">
                  <img src="./public/icons/arrow-right-circle-outlined.svg" alt="Right arrow"/>
                  <Card
                    title={arrData.destination}
                    trainLine={arrData.line.toString()}
                    minute={arrData.getArrivalTimeInMinutes()}
                  />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App
