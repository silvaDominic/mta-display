import { DIRECTION } from "../../../shared/constants/direction.enum";
import { ArrivalInfoModel } from "../../../application/models/arrival-info.model";
import { Card } from "../../components/card";

type MultiPlatformDisplayProps = {
  arrivalTimes: Map<DIRECTION, ArrivalInfoModel[]>;
}

export function MultiPlatformDisplay({arrivalTimes}: MultiPlatformDisplayProps) {
  return (
    <>
      <div id="stack">
        <div className="container">
          {
            arrivalTimes?.get(DIRECTION.N)?.map((arrData: ArrivalInfoModel, index: number) => (
              <div className={`wrapper pos-${index}`}>
                <div className="left-direction direction">
                  <img src="../../public/icons/arrow-left-circle-outlined.svg" alt="Left arrow"/>
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
            arrivalTimes?.get(DIRECTION.S)?.map((arrData: ArrivalInfoModel, index: number) => (
              <div className={`wrapper pos-${index}`}>
                <div className="right-direction direction">
                  <img src="../../public/icons/arrow-right-circle-outlined.svg" alt="Right arrow"/>
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
  );
}
