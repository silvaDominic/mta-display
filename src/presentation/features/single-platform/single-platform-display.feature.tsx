import { ReactElement } from "react";
import { DIRECTION } from "../../../shared/constants/direction.enum";
import { ArrivalInfoModel } from "../../../application/models/arrival-info.model";
import { Card } from "../../components/card";
import './single-platform-display.styles.scss';

type SinglePlatformDisplayProps = {
  arrivalTimes: Map<DIRECTION, ArrivalInfoModel[]>,
  direction: DIRECTION,
}

export function SinglePlatformDisplay({arrivalTimes, direction}: SinglePlatformDisplayProps): ReactElement {
  return (
    <div className="spd container">
        {
          arrivalTimes?.get(DIRECTION[direction])?.map((arrData: ArrivalInfoModel, index: number) => (
            <div className={`spd wrapper pos-${index}`}>
                <Card
                  title={arrData.destination}
                  trainLine={arrData.line.toString()}
                  minute={arrData.getArrivalTimeInMinutes()}
                  isFront={index > 1}
                  style={{ height: '200px' }}
                />
            </div>
          ))
        }
      </div>
  );
}
