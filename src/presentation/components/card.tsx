import { CSSProperties, ReactElement } from "react";
import './card.scss';

type CardProps = {
  title: string;
  trainLine: string;
  minute: number;
  isFront?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Card({title, trainLine, minute, isFront, className = '', style}: CardProps): ReactElement {

  return(
    <div style={style} className={`card card__container ${className}`}>
      <div className='card__content'>
        <div className='card__wrapper'>
          <img className='card__train-line' src={`/train-line-icons/${trainLine.toLowerCase()}.svg`} alt=""/>
          {isFront && <h1 className="card__train-name">{title}</h1>}
        </div>
        <div className="card__minute">
          {
            minute <= 0
            ? <h1>Now</h1>
            : <>
                <h1>{minute}</h1>
                <span>min</span>
              </>
          }
        </div>
      </div>
      <div className='card-spacer'></div>
    </div>
  );
}
