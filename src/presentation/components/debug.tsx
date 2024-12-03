import { Fragment, ReactElement } from "react";
import { ArrivalInfoModel } from "../../application/models/arrival-info.model";

type DebugProps = {
  arrivalTimes: ArrivalInfoModel[],
}

export function Debug({arrivalTimes}: DebugProps): ReactElement {
  return (
    <ol>
      {
        arrivalTimes.map((time: ArrivalInfoModel) => {
          return(
            <Fragment key={time.id}>
              <li style={{color: 'white'}}>
                <span><span>{time.destination}</span> {time.getTimeUntilArrivalInMinutes()} mins</span>
                <div>{time.getTimeUntilDepartureInMinutes()} </div>
              </li>
            </Fragment>
          )
        })
      }
    </ol>
  )
}
