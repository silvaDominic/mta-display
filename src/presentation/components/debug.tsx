import { Fragment, ReactElement } from "react";
import { StopInfoModel } from "../../application/models/stop-info.model";

type DebugProps = {
  arrivalTimes: StopInfoModel[],
}

export function Debug({arrivalTimes}: DebugProps): ReactElement {
  return (
    <ol>
      {
        arrivalTimes.map((time: StopInfoModel) => {
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
