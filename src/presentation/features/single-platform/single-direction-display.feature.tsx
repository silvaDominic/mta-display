import { ReactElement, useEffect, useState } from "react";
import { ArrivalInfoModel } from "../../../application/models/arrival-info.model";
import { Card } from "../../components/card";
import './single-direction-display.styles.scss';
import { Debug } from "../../components/debug";

type SingleDirectionDisplayProps = {
  arrivalTimes: ArrivalInfoModel[],
}

export function SingleDirectionDisplay({arrivalTimes}: SingleDirectionDisplayProps): ReactElement {
  const sortedTimes: ArrivalInfoModel[] = arrivalTimes.sort((timeA, timeB) => timeB.getArrivalTimeInMinutes() - timeA.getArrivalTimeInMinutes());
  const [displayedTimes, setDisplayedTimes] = useState<ArrivalInfoModel[]>(sortedTimes);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    setDisplayedTimes((prev: ArrivalInfoModel[]) => {
      if (prev !== sortedTimes) {
        setIsDeleting(true);
        return prev;
      }
      return sortedTimes;
    });
  }, [sortedTimes]);

  function onTransitionEnd() {
    setIsDeleting(false);
    setDisplayedTimes(sortedTimes);
  }

  return (
    <>
      <div className="sdd container">
        {
          displayedTimes?.map((arrData: ArrivalInfoModel, index: number) => (
            <div
              key={arrData.id}
              className={`sdd wrapper pos-${index} ${index === 2 && isDeleting ? 'deleting' : ''}`}
              onTransitionEnd={onTransitionEnd}
            >
              <Card
                title={arrData.destination}
                trainLine={arrData.line.toString()}
                minute={arrData.getArrivalTimeInMinutes()}
                isFront={index > 1}
              />
            </div>
          ))
        }
      </div>

      <hr/>

      <Debug arrivalTimes={arrivalTimes}/>
    </>
  );
}
