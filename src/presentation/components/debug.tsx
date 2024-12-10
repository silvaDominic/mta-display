import { Fragment, ReactElement } from "react";
import { StopInfoModel } from "../../application/models/stop-info.model";

type DebugProps = {
  stops: StopInfoModel[],
}

export function Debug({stops}: DebugProps): ReactElement {
  return (
    <ol>
      {
        stops.map((stop: StopInfoModel) => {
          return(
            <Fragment key={stop.id}>
              <li style={{color: 'white'}}>
                <span><span>{stop.destination}</span> {stop.getTimeUntilArrivalInMinutes()} mins</span>
                <div>{stop.getTimeUntilDepartureInMinutes()} </div>
              </li>
            </Fragment>
          )
        })
      }
    </ol>
  )
}
