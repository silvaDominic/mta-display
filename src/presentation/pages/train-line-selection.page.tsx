import { ReactElement } from "react";
import { useNavigate } from "react-router";

import './pages.styles.scss';
import { TrainService } from "../../application/services/train.service";

export function TrainLineSelectionPage(): ReactElement {
  const navigate = useNavigate();

  function onConfirm(lineId: string): void {
    navigate(`./${lineId}`);
  }

  return (
    <div className='selection__container'>
      <h1>Select Train Line</h1>

      <div className='train-line-grid__container'>
        {
          TrainService.getTrainLines().map(line => (
            <button
              key={line.id}
              onClick={() => onConfirm(line.id)}
              className='train-line__button'
            >
              <img src={line.imgRef} alt={line.longName}/>
            </button>
          ))
        }
      </div>
    </div>
  );
}
