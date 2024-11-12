import { ReactElement } from "react";
import { DIRECTION } from "../../../shared/constants/direction.enum";
import { ArrivalInfoModel } from "../../../application/models/arrival-info.model";
import { Card } from "../../components/card";
import './single-direction-display.styles.scss';

type SingleDirectionDisplayProps = {
  arrivalTimes: Map<DIRECTION, ArrivalInfoModel[]>,
  direction: DIRECTION,
}

export function SingleDirectionDisplay({arrivalTimes, direction}: SingleDirectionDisplayProps): ReactElement {
  return (
    <div className="sdd container">
        {
          arrivalTimes?.get(DIRECTION[direction])?.map((arrData: ArrivalInfoModel, index: number) => (
            <div className={`sdd wrapper pos-${index}`}>
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
