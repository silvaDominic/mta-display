import { ReactElement } from "react";
import { ArrivalInfoModel } from "../../application/models/arrival-info.model";

type DebugProps = {
  arrivalTimes: ArrivalInfoModel[],
}

export function Debug({arrivalTimes}: DebugProps): ReactElement {
  return (
    <ol>
      {
        arrivalTimes.map((time) => {
          return(
            <li key={time.id} style={{color: 'white'}}>
              <span><span>{time.destination}</span> {time.getArrivalTimeInMinutes()} mins</span>
            </li>
          )
        })
      }
    </ol>
  )
}
