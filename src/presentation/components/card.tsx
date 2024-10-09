import { ReactElement } from "react";
import './card.scss';

type CardProps = {
  title: string;
  trainLine: string;
  minute: number;
}

export function Card({title, trainLine, minute}: CardProps): ReactElement {

  return(
    <div className='card card-conatiner'>
      <div className='card-content'>
        <div>
          <h2 className="train-line"><span>{trainLine}</span></h2>
          <h1 className="title">{title}</h1>
        </div>
        <div className="minute">
          <h1>{minute}</h1>
          <span>min</span>
        </div>
      </div>
      <div className='card-spacer'></div>
    </div>
  );
}
