import { ArrivalInfoModel } from "../../../application/models/arrival-info.model";
import { Card } from "../../components/card";
import './multi-direction-display.styles.scss';
import { Debug } from "../../components/debug";

type MultiDirectionDisplayProps = {
  leftSideArrivals: ArrivalInfoModel[];
  rightSideArrivals: ArrivalInfoModel[];
}

export function MultiDirectionDisplay({leftSideArrivals, rightSideArrivals}: MultiDirectionDisplayProps) {
  const sortedLeftSideArrivals = leftSideArrivals
    .sort((timeA, timeB) => timeB.getArrivalTimeInMinutes() - timeA.getArrivalTimeInMinutes()).slice(0, 3);
  const sortedRightSideArrivals = rightSideArrivals
    .sort((timeA, timeB) => timeB.getArrivalTimeInMinutes() - timeA.getArrivalTimeInMinutes()).slice(0, 3);

  return (
    <>
      <div id="stack">
        <div className="mdd container">
          {
            sortedLeftSideArrivals.map((arrData: ArrivalInfoModel, index: number) => (
              <div key={arrData.id} className={`mdd wrapper pos-${index}`}>
                <div className="left-direction direction">
                  <img src="../../public/icons/arrow-left-circle-outlined.svg" alt="Left arrow"/>
                  <Card
                    title={arrData.destination}
                    trainLine={arrData.line.toString()}
                    minute={arrData.getArrivalTimeInMinutes()}
                    isFront={index > 1}
                  />
                </div>
              </div>
            ))
          }
        </div>

        <div className="mdd container">
          {
            sortedRightSideArrivals.map((arrData: ArrivalInfoModel, index: number) => (
              <div key={arrData.id} className={`mdd wrapper pos-${index}`}>
                <div className="right-direction direction">
                  <img src="../../public/icons/arrow-right-circle-outlined.svg" alt="Right arrow"/>
                  <Card
                    title={arrData.destination}
                    trainLine={arrData.line.toString()}
                    minute={arrData.getArrivalTimeInMinutes()}
                    isFront={index > 1}
                  />
                </div>
              </div>
            ))
          }
        </div>

        <div style={{color: 'white'}}>
          <h3>Left</h3>
          <Debug arrivalTimes={sortedLeftSideArrivals}/>
        </div>

        <div style={{color: 'white'}}>
          <h3>Right</h3>
          <Debug arrivalTimes={sortedRightSideArrivals}/>
        </div>
      </div>
    </>
  );
}
