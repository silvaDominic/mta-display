import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { TrainService } from "../../application/services/train.service";
import { PlatformModel } from "../../application/models/platform.model";

import './pages.styles.scss';

export function PlatformSelectionPage() {
  const [platforms, setPlatform] = useState<PlatformModel[]>([]);
  const navigate = useNavigate();
  const {station} = useParams();

  useEffect(() => {
    TrainService.getPlatform(station)
      .then(res => setPlatform(res));
  }, []);

  function onSubmit(event: FormEvent<HTMLFormElement>): void  {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const direction = formData.get('direction');

    navigate(`./platforms/${direction}`);
  }

  return (
    <div className='selection__container'>
      <h1>Select Platform</h1>

      <form onSubmit={onSubmit}>
        <select name="direction" id="platform-select">
          {
            platforms.map(option =>
              <option key={option.id} value={option.direction}>
                {option.direction} ({option.destination})
              </option>)
          }
        </select>
        <button>Confirm</button>
      </form>
    </div>
  );
}
